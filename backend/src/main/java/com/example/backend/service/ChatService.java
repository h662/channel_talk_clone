package com.example.backend.service;

import com.example.backend.dto.ChatMessageDto;
import com.example.backend.entity.ChatMessage;
import com.example.backend.repository.ChatMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final ChatMessageRepository chatMessageRepository;
    private final RedisPublisher redisPublisher;
    private final ChannelTopic channelTopic;

    @Transactional
    public ChatMessageDto sendMessage(ChatMessageDto messageDto) {
        ChatMessage chatMessage = ChatMessage.builder()
                .roomId(messageDto.getRoomId())
                .sender(messageDto.getSender())
                .sessionId(messageDto.getSessionId())
                .targetSessionId(messageDto.getTargetSessionId())
                .message(messageDto.getMessage())
                .type(messageDto.getType())
                .build();

        ChatMessage savedMessage = chatMessageRepository.save(chatMessage);
        ChatMessageDto savedDto = convertToDto(savedMessage);
        redisPublisher.publish(channelTopic, savedDto);

        return savedDto;
    }

    @Transactional(readOnly = true)
    public List<ChatMessageDto> getMessagesByRoomId(String roomId) {
        return chatMessageRepository.findByRoomIdOrderCreatedAtAsc(roomId)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ChatMessageDto> getRecentMessages() {
        return chatMessageRepository.findTop100ByOrderByCreatedAtDesc()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private ChatMessageDto convertToDto(ChatMessage entity) {
        return ChatMessageDto.builder()
                .id(entity.getId())
                .roomId(entity.getRoomId())
                .sender(entity.getSender())
                .sessionId(entity.getSessionId())
                .targetSessionId(entity.getTargetSessionId())
                .message(entity.getMessage())
                .type(entity.getType())
                .createdAt(entity.getCreatedAt())
                .build();
    }
}
