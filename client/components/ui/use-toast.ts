// Simple toast notification hook

export interface ToastProps {
  title: string;
  description?: string;
  variant?: "default" | "destructive";
}

export const toast = ({
  title,
  description,
  variant = "default",
}: ToastProps) => {
  // Simple browser alert for now - in a real app you'd use a proper toast library
  const message = description ? `${title}\n${description}` : title;

  if (variant === "destructive") {
    alert(`❌ ${message}`);
  } else {
    alert(`✅ ${message}`);
  }
};

export const useToast = () => {
  return { toast };
};
