import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ShareIcon from ".";

const meta: Meta<typeof ShareIcon> = {
  title: "icons/ShareIcon",
  component: ShareIcon,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 32,
  },
};

export const Primary: Story = {
  args: {
    size: 32,
    variant: "primary",
  },
};

export const Alternate: Story = {
  args: {
    size: 32,
    variant: "alternate",
  },
};

export const Success: Story = {
  args: {
    size: 32,
    variant: "success",
  },
};

export const Info: Story = {
  args: {
    size: 32,
    variant: "info",
  },
};

export const Warning: Story = {
  args: {
    size: 32,
    variant: "warning",
  },
};

export const Error: Story = {
  args: {
    size: 32,
    variant: "error",
  },
};
