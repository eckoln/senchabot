import { Input } from "@/ui/input";
import { Label } from "@/ui/label";

export default function Page() {
  return (
    <div className="max-w-lg space-y-8">
      <div className="space-y-2">
        <Label>Name</Label>
        <Input value="John Doe" disabled />
      </div>
      <div className="space-y-2">
        <Label>Email</Label>
        <Input value="example@mail.com" disabled />
      </div>
    </div>
  );
}
