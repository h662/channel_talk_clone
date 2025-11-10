package com.example.backend.controller;

import com.example.backend.dto.ChatMessageDto;
import com.example.backend.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatRestController {
    private final ChatService chatService;

    @GetMapping("/messages")
    public ResponseEntity<List<ChatMessageDto>> getRecentMessages() {
        return ResponseEntity.ok(chatService.getRecentMessages());
    }

    @GetMapping("/messages/{roomId}")
    public ResponseEntity<List<ChatMessageDto>> getMessagesByRoomId(@PathVariable String roomId) {
        return ResponseEntity.ok(chatService.getMessagesByRoomId(roomId));
    }
}
