import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ButtonGroup, { ButtonGroupSeparator } from ".";
import Button from "../../atoms/button";
import AddIcon from "../../atoms/icons/add";
import PlayIcon from "../../atoms/icons/play";
import SearchIcon from "../../atoms/icons/search";
import SubtractIcon from "../../atoms/icons/subtract";
import Input from "../../atoms/input";
import InputGroup from "../input-group";
import InputGroupAddon from "../input-group/addon";
import InputGroupButton from "../input-group/button";
import InputGroupInput from "../input-group/input";
import Tooltip, { TooltipContent, TooltipTrigger } from "../tooltip";

const meta: Meta<typeof ButtonGroup> = {
  title: "Components/ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const WithOrientation: Story = {
  render: () => (
    <ButtonGroup
      orientation="vertical"
      aria-label="Media controls"
      className="h-fit"
    >
      <Button variant="outline" size="icon">
        <AddIcon size={16} />
      </Button>
      <Button variant="outline" size="icon">
        <SubtractIcon size={16} />
      </Button>
    </ButtonGroup>
  ),
};

export const WithDifferentSize: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-8">
      <ButtonGroup>
        <Button variant="outline" size="sm">
          Small
        </Button>
        <Button variant="outline" size="sm">
          Button
        </Button>
        <Button variant="outline" size="sm">
          Group
        </Button>
        <Button variant="outline" size="icon-sm">
          <AddIcon size={16} />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">Default</Button>
        <Button variant="outline">Button</Button>
        <Button variant="outline">Group</Button>
        <Button variant="outline" size="icon">
          <AddIcon size={16} />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="lg">
          Large
        </Button>
        <Button variant="outline" size="lg">
          Button
        </Button>
        <Button variant="outline" size="lg">
          Group
        </Button>
        <Button variant="outline" size="icon-lg">
          <AddIcon size={16} />
        </Button>
      </ButtonGroup>
    </div>
  ),
};

export const WithSeparator: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="secondary" size="sm">
        Copy
      </Button>
      <ButtonGroupSeparator />
      <Button variant="secondary" size="sm">
        Paste
      </Button>
    </ButtonGroup>
  ),
};

export const WithSplit: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="secondary">Button</Button>
      <ButtonGroupSeparator />
      <Button size="icon" variant="secondary">
        <AddIcon size={16} className="text-background" variant="adaptive" />
      </Button>
    </ButtonGroup>
  ),
};

export const WithInput: Story = {
  render: () => (
    <ButtonGroup>
      <Input placeholder="Search..." />
      <Button variant="outline" aria-label="Search">
        <SearchIcon size={16} />
      </Button>
    </ButtonGroup>
  ),
};

export const WithInputGroup: Story = {
  render: () => (
    <ButtonGroup className="[--radius:9999rem]">
      <ButtonGroup>
        <Button variant="outline" size="icon">
          <AddIcon size={16} />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <InputGroup>
          <InputGroupInput placeholder={"Record and send audio..."} />
          <InputGroupAddon align="inline-end">
            <Tooltip>
              <TooltipTrigger asChild>
                <InputGroupButton
                  size="icon-xs"
                  className="data-[active=true]:bg-orange-100 data-[active=true]:text-orange-700 dark:data-[active=true]:bg-orange-800 dark:data-[active=true]:text-orange-100"
                >
                  <PlayIcon size={16} />
                </InputGroupButton>
              </TooltipTrigger>
              <TooltipContent>Voice Mode</TooltipContent>
            </Tooltip>
          </InputGroupAddon>
        </InputGroup>
      </ButtonGroup>
    </ButtonGroup>
  ),
};
