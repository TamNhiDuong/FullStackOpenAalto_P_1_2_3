```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note right of browser: The request contains the new note as JSON data
    server-->>browser:  The server responds with HTTP status code 201 (created).
    deactivate server
```
