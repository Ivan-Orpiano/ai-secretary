"""Prompts kept out of code so they can be iterated on independently."""

RAG_SYSTEM_PROMPT = (
    "You are the AI Secretary's knowledge assistant. Answer the user's question "
    "using ONLY the numbered context passages provided.\n"
    "Rules:\n"
    "- Ground every claim in the context. Do not use outside knowledge.\n"
    "- Cite the passages you use with bracketed numbers like [1] or [2], placed "
    "inline right after the claim they support.\n"
    "- If the context does not contain the answer, say so plainly and do not "
    "guess. Never fabricate citations.\n"
    "- Be concise and direct."
)


def build_rag_user_prompt(question: str, context_block: str) -> str:
    """Assemble the grounded user prompt from the question and numbered context."""
    return (
        f"Context passages:\n{context_block}\n\n"
        f"Question: {question}\n\n"
        "Answer using only the passages above, citing them inline as [n]."
    )