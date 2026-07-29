# 🍳 GenAI Recipe Generator

An enterprise-grade AI Recipe Generator built with modern backend architecture and Large Language Models (LLMs).

## 🚀 Tech Stack

### Frontend

* Next.js
* TypeScript
* React

### Backend

* NestJS
* TypeScript

### AI

* Google Gemini
* Claude AI (Provider Ready)
* Prompt Engineering
* Strategy Pattern
* Factory Pattern

### Database

* PostgreSQL
* Prisma

---

# 🏗️ System Architecture

```text
                Next.js Frontend
                        │
                        ▼
                 NestJS Backend
                        │
                        ▼
                  Recipe Service
                        │
                        ▼
                    AI Service
                        │
        ┌───────────────┼───────────────┐
        ▼                               ▼
 Prompt Builder                 AI Provider (Strategy)
                                        │
                    ┌───────────────────┴───────────────────┐
                    ▼                                       ▼
             Gemini Provider                      Claude Provider
                    │
                    ▼
          Response Parser Service
                    │
                    ▼
        Response Validator Service
                    │
                    ▼
             Recipe Response DTO
```

---

# ✨ Features Implemented

## AI Module

* Multi-provider AI architecture
* Strategy Pattern for AI providers
* Factory Pattern using Dependency Injection
* Prompt Builder Service
* Generic Response Parser
* Generic Response Validator
* DTO-based AI response validation
* Configurable AI Provider
* Google Gemini Integration
* Claude Provider Ready

---

# 📦 Current Modules

## Health Module

* Health Check API

## Recipe Module

* Recipe Generation Request DTO
* Recipe Response DTO
* Recipe Service

## AI Module

* AI Service
* Prompt Builder
* AI Provider Interface
* Gemini Provider
* Claude Provider
* Response Parser
* Response Validator

---

# 📋 Project Status

## ✅ Sprint 1 - Foundation

* [x] Project Setup
* [x] Health API
* [x] Recipe Module
* [x] AI Module
* [x] Gemini Integration
* [x] Claude Provider Architecture
* [x] Prompt Builder
* [x] Response Parser
* [x] Response Validator
* [x] DTO Validation Pipeline

---

## 🚀 Upcoming Features

### Sprint 2

* AI Exception Layer
* AI Observability
* Prompt Versioning
* Retry Mechanism
* Unit Testing

### Sprint 3

* Embeddings
* Vector Database
* Retrieval-Augmented Generation (RAG)
* Model Context Protocol (MCP)
* AI Agents
* Tool Calling

---

# 🎯 Design Principles

* Clean Architecture
* SOLID Principles
* Separation of Concerns
* Dependency Injection
* Reusable AI Components
* Enterprise-Ready Design

---

# 📚 Learning Goals

This project is being built as a production-style GenAI application to demonstrate:

* Enterprise NestJS Architecture
* AI Provider Abstraction
* Prompt Engineering
* AI Response Processing
* Scalable Backend Design
* Modern Software Engineering Practices
