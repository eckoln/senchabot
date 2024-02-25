import { EnterIcon, ExitIcon } from "@radix-ui/react-icons";

import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";

export function BotControls() {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Bot Controls</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 space-x-3">
        <Button variant="secondary">
          <EnterIcon className="size-4" />
          <span>Join</span>
        </Button>
        <Button variant="destructive">
          <ExitIcon className="size-4" />
          <span>Part</span>
        </Button>
      </CardContent>
    </Card>
  );
}
