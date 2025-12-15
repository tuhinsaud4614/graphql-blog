"use client";

import * as React from "react";
import FormControl from "@/shared/components/atoms/FormControl";
import AlertIcon from "@/shared/components/atoms/icons/alert";
import EyeIcon from "@/shared/components/atoms/icons/eye";
import EyeCloseIcon from "@/shared/components/atoms/icons/eye-close";
import FileIcon from "@/shared/components/atoms/icons/file";
import InfoIcon from "@/shared/components/atoms/icons/info";
import LocationIcon from "@/shared/components/atoms/icons/location";
import Logo from "@/shared/components/atoms/icons/logo";
import MailIcon from "@/shared/components/atoms/icons/mail";
import MobileNavIcon from "@/shared/components/atoms/icons/mobile-nav";
import PeopleIcon from "@/shared/components/atoms/icons/people";
import PhoneIcon from "@/shared/components/atoms/icons/phone";
import SignoutIcon from "@/shared/components/atoms/icons/signout";
import StarIcon from "@/shared/components/atoms/icons/star";
import TrashIcon from "@/shared/components/atoms/icons/trash";
import Input from "@/shared/components/atoms/input";
import InputGroup from "@/shared/components/molecules/input-group";
import InputGroupAddon from "@/shared/components/molecules/input-group/addon";
import InputGroupInput from "@/shared/components/molecules/input-group/input";
import ThemeToggle from "@/shared/components/molecules/ThemeToggle";

import { doCredentialLogin } from "@/lib/actions";

export default function Home() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  // const x = useQuery()

  const onSubmit = async () => {
    try {
      // const callbackUrl = searchParams?.get("callbackUrl")∏;
      // await client.resetStore();

      const response = await doCredentialLogin({
        email,
        password,
      });

      console.log(response);

      // if (response) {
      //   console.log("error1", error);
      //   setError(response.error);
      // } else {
      //   reset();
      //   // // For solving not replacing login url with redirect url
      //   // callbackUrl && refresh();
      //   replace(callbackUrl ?? ROUTES.user.home);
      // }
    } catch (_error) {
      // setError((error as Error).message);
      // isDev() && console.error("Login@Errors: ", error);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center">
      <ThemeToggle />
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between px-16 py-32 sm:items-start">
        <div className="mb-8">
          <Logo size={64} />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <AlertIcon size={32} />
          <AlertIcon size={32} variant="primary" />
          <EyeIcon size={32} />
          <EyeIcon size={32} variant="primary" />
          <EyeCloseIcon size={32} />
          <EyeCloseIcon size={32} variant="primary" />
          <FileIcon size={32} />
          <FileIcon size={32} variant="primary" />
          <InfoIcon size={32} />
          <InfoIcon size={32} variant="primary" />
          <LocationIcon size={32} />
          <MailIcon size={32} />
          <MobileNavIcon size={32} />
          <PeopleIcon size={32} />
          <PhoneIcon size={32} />
          <SignoutIcon size={32} />
          <StarIcon size={32} />
          <TrashIcon size={32} />
        </div>
        <Input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input type="file" />
        <FormControl leftIcon={<EyeIcon size={16} />} />
        <FormControl leftIcon={<MailIcon size={16} />} />
        <FormControl leftIcon={<InfoIcon size={16} />} />
        <FormControl leftIcon={<AlertIcon size={16} />} />
        <InputGroup>
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon>
            <LocationIcon />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
        </InputGroup>
        <button onClick={onSubmit}>Submit</button>
      </main>
    </div>
  );
}
