import { useMemo } from "react";
import type { Chat } from "@reagentai/reagent/chat";

import { useAgentContext } from "./context.js";

const AgentNodeUI = (
  props: { render: Chat.UIRenderData } & Pick<Chat.Message, "node">
) => {
  "use client";
  if (!props.node) {
    return null;
  }
  const { nodesByTypeId } = useAgentContext();
  const components = useMemo(() => {
    const node = nodesByTypeId[props.node!.type];
    // ignore UI rendering if agent node not found
    if (!node) {
      return [];
    }
    // @ts-expect-error
    return [...node.execute()].reduce(
      (agg, curr) => {
        agg[curr[0]] = curr[1];
        return agg;
      },
      {} as Record<string, () => JSX.Element>
    );
  }, [props.node.type, nodesByTypeId]);

  const Component = useMemo(() => {
    return components[props.render.step];
  }, [props.render.step, components]);

  if (!Component) {
    return <></>;
  }
  return Component({ data: props.render.data });
};

export { AgentNodeUI };
export { useAgentContext, AgentContextProvider } from "./context";
