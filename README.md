# 🍳 GenAI Recipe Generator

An enterprise-grade AI Recipe Generator built with **NestJS**, **Next.js**, and **Large Language Models (LLMs)**.

This project demonstrates modern backend architecture, AI provider abstraction, clean code principles, SOLID design, and scalable AI integration suitable for production-grade applications.

# 🎯 Project Objective

This project is intentionally built incrementally, following real-world software engineering practices.

Rather than building a recipe application directly, the goal is to design a reusable AI platform that can support multiple business domains through clean architecture, provider abstraction, and generic AI pipelines.

---

# 🚀 Tech Stack

## Frontend

* Next.js
* React
* TypeScript

## Backend

* NestJS
* TypeScript
* Node.js

## AI & LLM

* Google Gemini
* Claude AI (Provider Ready)

## Database

* PostgreSQL
* Prisma ORM

## Architecture

* Dependency Injection
* Strategy Pattern
* Factory Pattern
* SOLID Principles
* Clean Architecture

---

# 🏗️ Current System Architecture

# 🏗️ Current System Architecture

```text
                Next.js Frontend
                        │
                        ▼
                RecipeController
                        │
                        ▼
                 RecipeService
                        │
                        ▼
              AIRequest<GenerateRecipeDto>
                        │
                        ▼
             Generic AIService<TRequest, TResponse>
                        │
                        ▼
         Generic PromptBuilderService
                        │
                        ▼
                AIProvider Interface
                        │
            ┌───────────┴────────────┐
            ▼                        ▼
     GeminiProvider          ClaudeProvider
            │
            ▼
     Google Gemini API
            │
            ▼
      Generic ResponseParser
            │
            ▼
    Generic ResponseValidator
            │
            ▼
         RecipeResponseDto
```

---

# 🔄 AI Request Pipeline

```text
HTTP Request
      │
      ▼
RecipeController
      │
      ▼
RecipeService
      │
      ▼
AIRequest<T>
      │
      ▼
AIService<TRequest, TResponse>
      │
      ▼
PromptBuilderService
      │
      ▼
AIProvider
      │
      ▼
Large Language Model
      │
      ▼
ResponseParser<TResponse>
      │
      ▼
ResponseValidator<TResponse>
      │
      ▼
HTTP Response
```

# 🚨 Exception Architecture

```text
AIException (Abstract)

        │

        ├── AIProviderException

        ├── AIParsingException

        └── AIValidationException

                │

                ▼

      AIExceptionFilter

                │

                ▼

      Standard JSON Response
```

Example Response

```json
{
  "statusCode": 500,
  "message": "Failed to communicate with Gemini",
  "timestamp": "2026-07-31T10:20:00.000Z",
  "path": "/recipes/generate"
}
```

---

# ✨ Features Implemented

# 🧠 Generic AI Pipeline

The AI module has been designed as a reusable framework instead of a recipe-specific implementation.

## Generic Components

- Generic AI Request (`AIRequest<T>`)
- Generic AI Service (`generate<TRequest, TResponse>()`)
- Generic Prompt Builder
- Generic Response Parser
- Generic Response Validator

This architecture allows new AI features to be added with minimal changes.

Examples:

- Recipe Generation
- Meal Planning
- Nutrition Analysis
- Shopping List Generation

## AI Module

* Generic AI Service
* Generic AI Request Pipeline
* Generic Prompt Builder
* Generic Response Parser
* Generic Response Validator
* AI Provider Interface
* Google Gemini Provider
* Claude Provider (Ready)
* Enterprise AI Exception Hierarchy
* Global Exception Filter
* Feature-based Prompt Routing

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
* AI Exception Hierarchy
* Global Exception Filter

---

# 📋 Project Status

## ✅ Sprint 1 — Foundation

* [x] Project Setup
* [x] Health Module
* [x] Recipe Module
* [x] AI Module
* [x] Google Gemini Integration
* [x] Claude Provider Architecture
* [x] Prompt Builder
* [x] Response Parser
* [x] Response Validator
* [x] DTO Validation Pipeline
* [x] AI Exception Hierarchy
* [x] Global Exception Filter

---

## 🚀 Sprint 2 (In Progress)

* Retry Mechanism
* Provider Failover
* Logging
* Observability
* Unit Testing
* Integration Testing

---

## 🚀 Sprint 2 (Completed)

* [x] Generic AI Service
* [x] Generic AI Request Model
* [x] Generic Prompt Builder
* [x] Generic Response Parser
* [x] Generic Response Validator
* [x] Feature-based Prompt Routing

---

## 🚀 Sprint 3 (Next)

* Retry Mechanism
* Provider Failover
* Logging
* Observability
* Unit Testing
* Integration Testing
---

# 🎯 Design Principles

This project follows modern enterprise software engineering practices.

* Clean Architecture
* SOLID Principles
* Separation of Concerns
* Dependency Injection
* Strategy Pattern
* Factory Pattern
* Enterprise Exception Handling
* Provider Abstraction
* Scalable AI Architecture

---

# 📚 Learning Goals

This project is being built as a production-style GenAI backend to practice:

* Enterprise NestJS Architecture
* AI Provider Abstraction
* Prompt Engineering
* AI Response Processing
* Enterprise Exception Handling
* Design Patterns
* Scalable Backend Design
* Modern Software Engineering Practices

---

# 🌟 Long-Term Vision

The goal is to evolve this project into a production-ready AI platform capable of supporting multiple AI-powered business workflows.

Future capabilities include:

* AI Recipe Generation
* Meal Planning
* Nutrition Analysis
* Shopping List Generation
* Multi-Provider AI Support
* Agentic AI Workflows
* Retrieval-Augmented Generation (RAG)
* Enterprise Observability
* Model Context Protocol (MCP)
* Generic AI Platform for Multiple Business Domains
