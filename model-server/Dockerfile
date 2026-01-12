FROM python:3.11-slim

# 작업 디렉토리
WORKDIR /app

# 기본 환경 변수
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# (선택) 기본 도구들 – 개발 중 디버깅 편의
RUN apt update && apt install -y \
    curl \
    git \
    vim \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# FastAPI 기본 포트
EXPOSE 8000

# 개발용: 컨테이너 안에서 작업할 거라 쉘 유지
CMD ["sh"]
