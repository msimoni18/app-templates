import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useTheme } from "@/components/theme/theme-provider";
import type { Theme } from "@/components/theme/theme-provider";

import { SunEmoji, MoonEmoji, SystemEmoji } from "../icons/emoji";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Select value={theme} onValueChange={(value: Theme) => setTheme(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue>
          {theme === "light" ? (
            <LightTheme />
          ) : theme === "dark" ? (
            <DarkTheme />
          ) : theme === "system" ? (
            <SystemTheme />
          ) : (
            <></>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="light">
            <LightTheme />
          </SelectItem>
          <SelectItem value="dark">
            <DarkTheme />
          </SelectItem>
          <SelectItem value="system">
            <SystemTheme />
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

const LightTheme = () => {
  return (
    <div>
      <SunEmoji /> Light
    </div>
  );
};

const DarkTheme = () => {
  return (
    <div>
      <MoonEmoji /> Dark
    </div>
  );
};

const SystemTheme = () => {
  return (
    <div>
      <SystemEmoji /> System
    </div>
  );
};
