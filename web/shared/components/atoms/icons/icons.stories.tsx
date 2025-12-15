import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import AddIcon from "./add";
import AgentIcon from "./agent";
import AlertIcon from "./alert";
import AnimatedEyeIcon from "./animated-eye";
import AnimatedHourglassIcon from "./animated-hourglass";
import AnimatedHourglass1Icon from "./animated-hourglass1";
import ArrDownIcon from "./arr-down";
import ArrGoIcon from "./arr-go";
import ArrSubnavIcon from "./arr-subnav";
import BackIcon from "./back";
import BadIcon from "./bad";
import BillIcon from "./bill";
import BrushIcon from "./brush";
import CalenderIcon from "./calender";
import CertIcon from "./cert";
import ChatPopIcon from "./chat-pop";
import CircleIcon from "./circle";
import CloseIcon from "./close";
import CompanyIcon from "./company";
import CompanyDetailIcon from "./company-detail";
import ConfirmIcon from "./confirm";
import ConnectionIcon from "./connection";
import CopyIcon from "./copy";
import CreditIcon from "./credit";
import DislikeIcon from "./dislike";
import DownloadIcon from "./download";
import DownloadCirIcon from "./download-cir";
import DropdownIcon from "./dropdown";
import EditIcon from "./edit";
import ExternalIcon from "./external";
import EyeIcon from "./eye";
import EyeCloseIcon from "./eye-close";
import FeedbackIcon from "./feedback";
import FileIcon from "./file";
import FlashIcon from "./flash";
import FolderIcon from "./folder";
import FtfIcon from "./ftf";
import GiftIcon from "./gift";
import GoodIcon from "./good";
import InfoIcon from "./info";
import JobIcon from "./job";
import JumpIcon from "./jump";
import LevelIcon from "./level";
import LikeIcon from "./like";
import LinkIcon from "./link";
import LoaderIcon from "./loader";
import LocationIcon from "./location";
import LockIcon from "./lock";
import LogoIcon from "./logo";
import MailIcon from "./mail";
import MobileNavIcon from "./mobile-nav";
import MoneyIcon from "./money";
import MoreIcon from "./more";
import NextIcon from "./next";
import NiceIcon from "./nice";
import NoLevelMiniIcon from "./no-level-mini";
import NolikeIcon from "./nolike";
import NoneIcon from "./none";
import NoteIcon from "./note";
import NotgoodIcon from "./notgood";
import OkIcon from "./ok";
import OrderIcon from "./order";
import PeopleIcon from "./people";
import PhoneIcon from "./phone";
import PlayIcon from "./play";
import PreviousIcon from "./previous";
import ProfileIcon from "./profile";
import QuoteIcon from "./quote";
import RecentIcon from "./recent";
import RefreshingIcon from "./refreshing";
import RegenerateIcon from "./regenerate";
import RemoteIcon from "./remote";
import RemoveIcon from "./remove";
import ReportIcon from "./report";
import ResponsibilityIcon from "./responsibility";
import ResumeIcon from "./resume";
import RocketIcon from "./rocket";
import SearchIcon from "./search";
import SendIcon from "./send";
import SettingIcon from "./setting";
import ShareIcon from "./share";
import SignoutIcon from "./signout";
import SkillIcon from "./skill";
import SortIcon from "./sort";
import SpinnerIcon from "./spinner";
import StarIcon from "./star";
import StarSparkleIcon from "./star-sparkle";
import StopIcon from "./stop";
import SubtractIcon from "./subtract";
import SuccessIcon from "./success";
import TimeIcon from "./time";
import ToIcon from "./to";
import TopIcon from "./top";
import TrashIcon from "./trash";
import TypescriptIcon from "./typescript";
import UndoIcon from "./undo";
import UploadIcon from "./upload";
import UserGroupIcon from "./user-group";
import WarnIcon from "./warn";
import WebIcon from "./web";

// Icon data with name and component
const icons = [
  { name: "Add", component: AddIcon },
  { name: "Agent", component: AgentIcon },
  { name: "Alert", component: AlertIcon },
  { name: "AnimatedEye", component: AnimatedEyeIcon },
  { name: "AnimatedHourglass", component: AnimatedHourglassIcon },
  { name: "AnimatedHourglass1", component: AnimatedHourglass1Icon },
  { name: "ArrDown", component: ArrDownIcon },
  { name: "ArrGo", component: ArrGoIcon },
  { name: "ArrSubnav", component: ArrSubnavIcon },
  { name: "Back", component: BackIcon },
  { name: "Bad", component: BadIcon },
  { name: "Bill", component: BillIcon },
  { name: "Brush", component: BrushIcon },
  { name: "Calender", component: CalenderIcon },
  { name: "Cert", component: CertIcon },
  { name: "ChatPop", component: ChatPopIcon },
  { name: "Circle", component: CircleIcon },
  { name: "Close", component: CloseIcon },
  { name: "Company", component: CompanyIcon },
  { name: "CompanyDetail", component: CompanyDetailIcon },
  { name: "Confirm", component: ConfirmIcon },
  { name: "Connection", component: ConnectionIcon },
  { name: "Copy", component: CopyIcon },
  { name: "Credit", component: CreditIcon },
  { name: "Dislike", component: DislikeIcon },
  { name: "Download", component: DownloadIcon },
  { name: "DownloadCir", component: DownloadCirIcon },
  { name: "Dropdown", component: DropdownIcon },
  { name: "Edit", component: EditIcon },
  { name: "External", component: ExternalIcon },
  { name: "Eye", component: EyeIcon },
  { name: "EyeClose", component: EyeCloseIcon },
  { name: "Feedback", component: FeedbackIcon },
  { name: "File", component: FileIcon },
  { name: "Flash", component: FlashIcon },
  { name: "Folder", component: FolderIcon },
  { name: "Ftf", component: FtfIcon },
  { name: "Gift", component: GiftIcon },
  { name: "Good", component: GoodIcon },
  { name: "Info", component: InfoIcon },
  { name: "Job", component: JobIcon },
  { name: "Jump", component: JumpIcon },
  { name: "Level", component: LevelIcon },
  { name: "Like", component: LikeIcon },
  { name: "Link", component: LinkIcon },
  { name: "Location", component: LocationIcon },
  { name: "Lock", component: LockIcon },
  { name: "Logo", component: LogoIcon },
  { name: "Loader", component: LoaderIcon },
  { name: "Mail", component: MailIcon },
  { name: "MobileNav", component: MobileNavIcon },
  { name: "Money", component: MoneyIcon },
  { name: "More", component: MoreIcon },
  { name: "Next", component: NextIcon },
  { name: "Nice", component: NiceIcon },
  { name: "NoLevelMini", component: NoLevelMiniIcon },
  { name: "Nolike", component: NolikeIcon },
  { name: "None", component: NoneIcon },
  { name: "Note", component: NoteIcon },
  { name: "Notgood", component: NotgoodIcon },
  { name: "Ok", component: OkIcon },
  { name: "Order", component: OrderIcon },
  { name: "People", component: PeopleIcon },
  { name: "Phone", component: PhoneIcon },
  { name: "Play", component: PlayIcon },
  { name: "Previous", component: PreviousIcon },
  { name: "Profile", component: ProfileIcon },
  { name: "Quote", component: QuoteIcon },
  { name: "Recent", component: RecentIcon },
  { name: "Refreshing", component: RefreshingIcon },
  { name: "Regenerate", component: RegenerateIcon },
  { name: "Remote", component: RemoteIcon },
  { name: "Remove", component: RemoveIcon },
  { name: "Report", component: ReportIcon },
  { name: "Responsibility", component: ResponsibilityIcon },
  { name: "Resume", component: ResumeIcon },
  { name: "Rocket", component: RocketIcon },
  { name: "Search", component: SearchIcon },
  { name: "Send", component: SendIcon },
  { name: "Setting", component: SettingIcon },
  { name: "Share", component: ShareIcon },
  { name: "Signout", component: SignoutIcon },
  { name: "Skill", component: SkillIcon },
  { name: "Sort", component: SortIcon },
  { name: "Spinner", component: SpinnerIcon },
  { name: "Star", component: StarIcon },
  { name: "StarSparkle", component: StarSparkleIcon },
  { name: "Stop", component: StopIcon },
  { name: "Subtract", component: SubtractIcon },
  { name: "Success", component: SuccessIcon },
  { name: "Time", component: TimeIcon },
  { name: "To", component: ToIcon },
  { name: "Top", component: TopIcon },
  { name: "Trash", component: TrashIcon },
  { name: "Undo", component: UndoIcon },
  { name: "Upload", component: UploadIcon },
  { name: "UserGroup", component: UserGroupIcon },
  { name: "Warn", component: WarnIcon },
  { name: "Web", component: WebIcon },
  { name: "Typescript", component: TypescriptIcon },
] as const;

// Grid component to display all icons
const IconsGrid = ({ iconSize = 32 }: { iconSize?: number }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
        gap: "24px",
        padding: "24px",
      }}
    >
      {icons.map(({ name, component: IconComponent }) => (
        <div
          key={name}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            padding: "16px",
            borderRadius: "12px",
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            transition: "all 0.2s ease-in-out",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow =
              "0 10px 40px -10px hsl(var(--primary) / 0.3)";
            e.currentTarget.style.borderColor = "hsl(var(--primary))";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.borderColor = "hsl(var(--border))";
          }}
        >
          <IconComponent size={iconSize} />
          <span
            style={{
              fontSize: "11px",
              fontWeight: 500,
              color: "hsl(var(--muted-foreground))",
              textAlign: "center",
              wordBreak: "break-word",
            }}
          >
            {name}
          </span>
        </div>
      ))}
    </div>
  );
};

const meta: Meta<typeof IconsGrid> = {
  title: "icons/All Icons",
  component: IconsGrid,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    iconSize: 32,
  },
};

export const Small: Story = {
  args: {
    iconSize: 24,
  },
};

export const Large: Story = {
  args: {
    iconSize: 48,
  },
};
