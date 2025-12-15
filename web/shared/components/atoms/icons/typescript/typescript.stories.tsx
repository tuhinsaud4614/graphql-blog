import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import TypescriptIcon from ".";

const meta: Meta<typeof TypescriptIcon> = {
  title: "icons/TypescriptIcon",
  component: TypescriptIcon,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 32,
  },
};
