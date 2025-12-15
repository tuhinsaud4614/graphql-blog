import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Logo from ".";

const meta: Meta<typeof Logo> = {
  title: "icons/Logo",
  component: Logo,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 40,
  },
};
