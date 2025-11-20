"use client";

import { useReactFlow, type Node, type NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseExecutionNode } from "../base-execution-node";
import { GeminiFormValues, GeminiDialog, AVAILABLE_MODELS } from "./diaglog";
import { useNodeStatus } from "../../hooks/use-node-status";
import { fetchGeminiRealtimeToken } from "./actions";
import { GEMINI_CHANNEL_NAME } from "@/inngest/channels/gemini";

type GeminiNodeData = {
    variableName?: string;
    model?: string;
    credentialId?: string;
    systemPrompt?: string;
    userPrompt?: string;
};

type GeminiNodeType = Node<GeminiNodeData>;

export const GeminiNode = memo((props: NodeProps<GeminiNodeType>) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const { setNodes } = useReactFlow();
    const nodeStatus = useNodeStatus({
        nodeId: props.id,
        channel: GEMINI_CHANNEL_NAME,
        topic: "status",
        refreshToken: fetchGeminiRealtimeToken,
    });
    const handleOpenSettings = () => {
        setDialogOpen(true);
    };
    const handleSubmit = (values: GeminiFormValues) => {
        setNodes((nodes) =>
            nodes.map((node) => {
                if (node.id === props.id) {
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            ...values,
                        },
                    };
                }
                return node;
            })
        );
        setDialogOpen(false);
    };

    const nodeData = props.data;
    const description = nodeData?.userPrompt
        ? `${
              nodeData.model || AVAILABLE_MODELS[0]
          } : ${nodeData.userPrompt.slice(0, 50)}...`
        : "Not Configured";

    return (
        <>
            <GeminiDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                onSubmit={handleSubmit}
                defaultValues={nodeData}
            />
            <BaseExecutionNode
                {...props}
                icon="/logos/gemini.svg"
                name="Gemini"
                description={description}
                status={nodeStatus}
                onSettings={handleOpenSettings}
                onDoubleClick={handleOpenSettings}
            />
        </>
    );
});

GeminiNode.displayName = "GeminiNode";
