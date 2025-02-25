CREATE DATABASE wireframe_tool;

USE wireframe_tool;

CREATE TABLE drafts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL
);
