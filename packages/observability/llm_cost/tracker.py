MODEL_COSTS = {
    "claude-sonnet-4-20250514": {"input": 3.0, "output": 15.0, "currency": "USD"},
    "claude-haiku-3-5-20241022": {"input": 0.8, "output": 4.0, "currency": "USD"},
    "gpt-4o": {"input": 5.0, "output": 15.0, "currency": "USD"},
    "gpt-4o-mini": {"input": 0.15, "output": 0.6, "currency": "USD"},
}


def cost_usd(model, input_tokens, output_tokens):
    rates = MODEL_COSTS.get(model)
    if not rates:
        return None
    input_cost = (input_tokens / 1_000_000) * rates["input"]
    output_cost = (output_tokens / 1_000_000) * rates["output"]
    return round(input_cost + output_cost, 6)


class LLMCostTracker:
    def __init__(self):
        self._records = []

    def record(self, model, input_tokens, output_tokens, app=None, feature=None):
        cost = cost_usd(model, input_tokens, output_tokens)
        self._records.append(
            {
                "model": model,
                "input_tokens": input_tokens,
                "output_tokens": output_tokens,
                "cost_usd": cost,
                "app": app,
                "feature": feature,
            }
        )
        return cost

    def summary(self):
        total = sum(r["cost_usd"] or 0 for r in self._records)
        by_model = {}
        for r in self._records:
            by_model.setdefault(r["model"], {"calls": 0, "cost_usd": 0})
            by_model[r["model"]]["calls"] += 1
            by_model[r["model"]]["cost_usd"] += r["cost_usd"] or 0
        return {"total_cost_usd": round(total, 6), "by_model": by_model}

    def reset(self):
        self._records.clear()


def track_cost(model=None, feature=None):
    def decorator(func):
        def wrapper(*args, **kwargs):
            tracker = kwargs.get("cost_tracker") or LLMCostTracker()
            result = func(*args, **kwargs)
            if isinstance(result, dict) and "usage" in result:
                usage = result["usage"]
                tracker.record(
                    model=model or result.get("model", "unknown"),
                    input_tokens=usage.get("input_tokens", 0),
                    output_tokens=usage.get("output_tokens", 0),
                    feature=feature,
                )
            return result

        return wrapper

    return decorator
