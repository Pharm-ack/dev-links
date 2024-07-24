"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
function BackToEditor() {
  const router = useRouter();
  return (
    <Button
      variant={"outline"}
      onClick={() => {
        router.push("/links");
      }}
    >
      Back to Editor
    </Button>
  );
}

export default BackToEditor;
