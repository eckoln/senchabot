import { Switch } from "@/ui/switch";

interface Props {
  id: string;
  label: string;
  description?: string;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export function SwitchItem({
  id,
  label,
  description,
  defaultChecked = false,
  onCheckedChange,
}: Props) {
  return (
    <div className="flex items-center justify-between space-x-6 rounded-md border bg-card px-6 py-4">
      <div className="space-y-0.5">
        <label className="text-sm font-medium" htmlFor={id}>
          {label}
        </label>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Switch
        id={id}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
}
