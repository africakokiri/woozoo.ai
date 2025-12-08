"use client";

import {
  ModelSelector,
  ModelSelectorContent,
  ModelSelectorEmpty,
  ModelSelectorGroup,
  ModelSelectorInput,
  ModelSelectorItem,
  ModelSelectorList,
  ModelSelectorLogo,
  ModelSelectorLogoGroup,
  ModelSelectorName,
  ModelSelectorTrigger
} from "@/components/thread/model-selector";
import { Button } from "@/ui/button";

import { CheckIcon } from "lucide-react";
import { useState } from "react";

const models = [
  {
    id: "gpt-4o",
    name: "GPT-4o",
    chef: "OpenAI",
    chefSlug: "openai",
    providers: ["openai", "azure"]
  },
  {
    id: "gpt-4o-mini",
    name: "GPT-4o Mini",
    chef: "OpenAI",
    chefSlug: "openai",
    providers: ["openai", "azure"]
  },
  {
    id: "o1",
    name: "o1",
    chef: "OpenAI",
    chefSlug: "openai",
    providers: ["openai", "azure"]
  },
  {
    id: "o1-mini",
    name: "o1 Mini",
    chef: "OpenAI",
    chefSlug: "openai",
    providers: ["openai", "azure"]
  },
  {
    id: "gemini-2.0-flash-exp",
    name: "Gemini 2.0 Flash",
    chef: "Google",
    chefSlug: "google",
    providers: ["google", "google-vertex"]
  },
  {
    id: "gemini-1.5-pro",
    name: "Gemini 1.5 Pro",
    chef: "Google",
    chefSlug: "google",
    providers: ["google", "google-vertex"]
  },
  {
    id: "gemini-1.5-flash",
    name: "Gemini 1.5 Flash",
    chef: "Google",
    chefSlug: "google",
    providers: ["google", "google-vertex"]
  }
];

export const ModelSelectorComponent = () => {
  const [open, setOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>("gpt-4o");

  const selectedModelData = models.find((model) => model.id === selectedModel);

  // Get unique chefs in order of appearance
  const chefs = Array.from(new Set(models.map((model) => model.chef)));

  return (
    <div className="flex items-center justify-center">
      <ModelSelector
        onOpenChange={setOpen}
        open={open}
      >
        <ModelSelectorTrigger asChild>
          <Button
            className="w-fit justify-between"
            variant="ghost"
          >
            {selectedModelData?.chefSlug && <ModelSelectorLogo provider={selectedModelData.chefSlug} />}
            {selectedModelData?.name && <ModelSelectorName>{selectedModelData.name}</ModelSelectorName>}
          </Button>
        </ModelSelectorTrigger>
        <ModelSelectorContent>
          <ModelSelectorInput placeholder="Search models..." />
          <ModelSelectorList>
            <ModelSelectorEmpty>No models found.</ModelSelectorEmpty>
            {chefs.map((chef) => (
              <ModelSelectorGroup
                heading={chef}
                key={chef}
              >
                {models
                  .filter((model) => model.chef === chef)
                  .map((model) => (
                    <ModelSelectorItem
                      key={model.id}
                      onSelect={() => {
                        setSelectedModel(model.id);
                        setOpen(false);
                      }}
                      value={model.id}
                    >
                      <ModelSelectorLogo provider={model.chefSlug} />
                      <ModelSelectorName>{model.name}</ModelSelectorName>
                      <ModelSelectorLogoGroup>
                        {model.providers.map((provider) => (
                          <ModelSelectorLogo
                            key={provider}
                            provider={provider}
                          />
                        ))}
                      </ModelSelectorLogoGroup>
                      {selectedModel === model.id ? (
                        <CheckIcon className="ml-auto size-4" />
                      ) : (
                        <div className="ml-auto size-4" />
                      )}
                    </ModelSelectorItem>
                  ))}
              </ModelSelectorGroup>
            ))}
          </ModelSelectorList>
        </ModelSelectorContent>
      </ModelSelector>
    </div>
  );
};
