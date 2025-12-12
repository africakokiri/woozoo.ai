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
} from "@/components/ai-elements/model-selector";
import { MODELS_GOOGLE } from "@/constants/models";
import { Button } from "@/ui/button";
import { useModelStore } from "@/utils/zustand/use-model";

import { CheckIcon } from "lucide-react";
import { useState } from "react";

const models = [...MODELS_GOOGLE];

export const ModelSelectorRenderer = () => {
  const [open, setOpen] = useState(false);
  const { model: selectedModel, setModel: setSelectedModel } = useModelStore();

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
            variant="outline"
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
                key={chef}
                heading={chef}
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
