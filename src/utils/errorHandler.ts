import { Response } from "express";

export const handleError = (err: unknown, res: Response) => {
  if (err instanceof Error) {
    console.error("Error:", err.message);
    res.status(500).json({ error: err.message });
  } else {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};
