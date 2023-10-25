import * as React from "react";

type FixedForwardRef = <T, P = {}>(
  render: (props: P, ref: React.Ref<T>) => React.ReactNode,
) => (props: P & React.RefAttributes<T>) => React.ReactNode;

const fixedForwardRef = React.forwardRef as FixedForwardRef;

type DistributiveOmit<T, TOmitted extends PropertyKey> = T extends any
  ? Omit<T, TOmitted>
  : never;

export const UnwrappedAnyComponent = <TAs extends React.ElementType>(
  props: {
    as?: TAs;
  } & DistributiveOmit<
    React.ComponentPropsWithRef<React.ElementType extends TAs ? "div" : TAs>,
    "as"
  >,
  ref: React.ForwardedRef<any>,
) => {
  const { as: Comp = "div", ...rest } = props;
  return <Comp {...rest} ref={ref}></Comp>;
};

const AsComponent = fixedForwardRef(UnwrappedAnyComponent);

export default AsComponent;
