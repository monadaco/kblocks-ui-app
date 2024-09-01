import * as OutlineHeroIcons from "@heroicons/react/24/outline";
import * as SolidHeroIcons from "@heroicons/react/24/solid";

import type { Colors } from "../lib/colors.ts";

const getHeroIconName = (heroiconId: string): string => {
  const parts = heroiconId.split("-");
  const resourceName = parts
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
  return `${resourceName}Icon`;
};

export const getIconComponent = ({
  solid = false,
  icon = "code-bracket-square",
}: {
  solid?: boolean;
  icon?: string;
}) => {
  const iconSet = solid ? SolidHeroIcons : OutlineHeroIcons;
  // @ts-expect-error -- any
  const iconComponent = iconSet[getHeroIconName(icon)];
  if (iconComponent) {
    return iconComponent;
  } else {
    return iconSet.CodeBracketIcon;
  }
};

interface ColorSet {
  default: string;
  groupHover: string;
  forceDarken: string;
}

const colors: Record<Colors, ColorSet> = {
  orange: {
    default: "text-orange-500 dark:text-orange-400",
    groupHover: "group-hover:text-orange-600 dark:group-hover:text-orange-300",
    forceDarken: "text-orange-600 dark:text-orange-300",
  },
  sky: {
    default: "text-sky-500 dark:text-sky-400",
    groupHover: "group-hover:text-sky-600 dark:group-hover:text-sky-300",
    forceDarken: "text-sky-600 dark:text-sky-300",
  },
  emerald: {
    default: "text-emerald-500 dark:text-emerald-400",
    groupHover:
      "group-hover:text-emerald-600 dark:group-hover:text-emerald-300",
    forceDarken: "text-emerald-600 dark:text-emerald-300",
  },
  lime: {
    default: "text-lime-500 dark:text-lime-400",
    groupHover: "group-hover:text-lime-600 dark:group-hover:text-lime-300",
    forceDarken: "text-lime-600 dark:text-lime-300",
  },
  pink: {
    default: "text-pink-500 dark:text-pink-400",
    groupHover: "group-hover:text-pink-600 dark:group-hover:text-pink-300",
    forceDarken: "text-pink-600 dark:text-pink-300",
  },
  amber: {
    default: "text-amber-500 dark:text-amber-400",
    groupHover: "group-hover:text-amber-600 dark:group-hover:text-amber-300",
    forceDarken: "text-amber-600 dark:text-amber-300",
  },
  cyan: {
    default: "text-cyan-500 dark:text-cyan-400",
    groupHover: "group-hover:text-cyan-600 dark:group-hover:text-cyan-300",
    forceDarken: "text-cyan-600 dark:text-cyan-300",
  },
  purple: {
    default: "text-purple-500 dark:text-purple-400",
    groupHover: "group-hover:text-purple-600 dark:group-hover:text-purple-300",
    forceDarken: "text-purple-600 dark:text-purple-300",
  },
  red: {
    default: "text-red-700 dark:text-red-400",
    groupHover: "group-hover:text-red-700 dark:group-hover:text-red-300",
    forceDarken: "text-red-700 dark:text-red-300",
  },
  violet: {
    default: "text-violet-700 dark:text-violet-400",
    groupHover: "group-hover:text-violet-700 dark:group-hover:text-violet-300",
    forceDarken: "text-violet-700 dark:text-violet-300",
  },
  slate: {
    default: "text-slate-700 dark:text-slate-400",
    groupHover: "group-hover:text-slate-600 dark:group-hover:text-slate-300",
    forceDarken: "text-slate-600 dark:text-slate-300",
  },
};

export const getResourceIconColors = (options: {
  darkenOnGroupHover?: boolean;
  forceDarken?: boolean;
  color?: Colors | string;
} = {}) => {
  const color: Colors =
    options.color && Object.keys(colors).includes(options.color)
      ? (options.color as Colors)
      : "slate";

  const chosenColor = [
    colors[color].default,
    options.darkenOnGroupHover && colors[color].groupHover,
    options.forceDarken && colors[color].forceDarken,
  ];

  return chosenColor;
};
