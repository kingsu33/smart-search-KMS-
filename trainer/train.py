import os
from datasets import load_dataset
from transformers import (
    AutoTokenizer,
    AutoModelForCausalLM,
    TrainingArguments,
    Trainer,
    DataCollatorForLanguageModeling,
)

MODEL_NAME = os.getenv("BASE_MODEL", "distilgpt2")
DATA_PATH = os.getenv("DATA_PATH", "data.jsonl")
OUT_DIR = os.getenv("OUT_DIR", "/out/distilgpt2-chat")

def main():
    ds = load_dataset("json", data_files=DATA_PATH, split="train")

    tok = AutoTokenizer.from_pretrained(MODEL_NAME)
    if tok.pad_token is None:
        tok.pad_token = tok.eos_token

    model = AutoModelForCausalLM.from_pretrained(MODEL_NAME)

    def to_text(ex):
        # prompt + response를 하나의 학습 텍스트로 합침
        text = ex["prompt"] + ex["response"]
        return {"text": text}

    ds = ds.map(to_text)

    def tokenize(ex):
        return tok(ex["text"], truncation=True, max_length=256)

    tokenized = ds.map(tokenize, remove_columns=ds.column_names)

    args = TrainingArguments(
        output_dir=OUT_DIR,
        per_device_train_batch_size=2,
        num_train_epochs=3,
        learning_rate=5e-5,
        logging_steps=5,
        save_steps=50,
        save_total_limit=2,
        fp16=False,  # CPU 기준
    )

    collator = DataCollatorForLanguageModeling(tokenizer=tok, mlm=False)

    trainer = Trainer(
        model=model,
        args=args,
        train_dataset=tokenized,
        data_collator=collator,
    )

    trainer.train()

    # 저장 (FastAPI에서 로드할 수 있도록)
    model.save_pretrained(OUT_DIR)
    tok.save_pretrained(OUT_DIR)

    print(f"✅ Saved to: {OUT_DIR}")

if __name__ == "__main__":
    main()
