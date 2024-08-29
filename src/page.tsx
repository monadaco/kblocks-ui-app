import { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./components/sidebar";
import { cn } from "./lib/utils";
import { useGetCRDs } from "./services/use-get-crds";
import { useLocation } from "react-router-dom";
import { CRDData } from "./types/crd";
import { AppView } from "./app-view";
import {
  getIconComponent,
  getResourceIconColors,
} from "./components/hero-icon";
import { BlockView } from "./block-view";
import { useGetApps } from "./services/use-get-apps";
import { ArgoApplication } from "./types/argo";

export const Component = () => {
  const location = useLocation();
  const { getCRDs } = useGetCRDs();
  const { getArgoApps } = useGetApps();

  const [crds, setCRDs] = useState<Record<string, CRDData>>({});
  const [apps, setApps] = useState<Record<string, ArgoApplication>>({});
  const [selectedBlock, setSelectedBlock] = useState<CRDData | null | undefined>(null);
  const [selectedApp, setSelectedApp] = useState<ArgoApplication | null | undefined>(null);

  useEffect(() => {
    getCRDs().then((data) => {
      if (!Array.isArray(data)) {
        setCRDs({});
        return;
      }

      const map: Record<string, CRDData> = {};
      for (const crd of data) {
        map[crd.kind.toLowerCase()] = crd;
      }

      setCRDs(map);
    });
  }, []);

  useEffect(() => {
    getArgoApps().then((data) => {
      const apps: ArgoApplication[] = data?.body?.items;
      if (!Array.isArray(apps)) {
        setApps({});
        return;
      }

      const map: Record<string, ArgoApplication> = {};
      for (const app of apps) {
        map[app.metadata.name] = app;
      }

      setApps(map);
    });
  }, []);

  useEffect(() => {
    const parts = location.pathname.split("/");
    const type = parts[parts.length - 2];
    const id = parts[parts.length - 1];

    switch (type) {
      case "blocks": {
        const current = crds[id.toLowerCase()];
        setSelectedBlock(current);
        setSelectedApp(null);
        break;
      }

      case "apps": {
        const current = apps[id];
        setSelectedApp(current);
        setSelectedBlock(null);
        break;
      }
    }

  }, [location, crds, apps]);

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-full",
      )}
    >
      <Sidebar animate={false}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

            {/* Applications Section */}
            <div className="flex flex-col font-bold">
              <h3 className="text-left py-2"> Services</h3>
              {Object.values(apps).map((app, idx) => {
                const Icon = getIconComponent({ icon: "window" });
                const iconColor = getResourceIconColors();
                return <SidebarLink
                  key={idx}
                  link={{
                    label: app.metadata.name,
                    navigate: `${import.meta.env.BASE_URL}/apps/${app.metadata.name}`,
                    icon: <Icon className={`${iconColor} h-5 w-5 flex-shrink-0`} />
                  }}
                />
              })}
            </div>

            {/* Components Section */}
            <div className="flex flex-col mt-2 font-bold">
              <h3 className="text-left py-2">Blocks</h3>
              {Object.values(crds).map((crd, idx) => {
                const crdName = crd.kind;
                const Icon = getIconComponent({ icon: crd?.icon });
                const iconColor = getResourceIconColors({
                  color: crd?.color,
                });

                return <SidebarLink
                  key={idx}
                  link={{
                    label: crdName,
                    navigate: `${import.meta.env.BASE_URL}/blocks/${crdName}`,
                    icon: (
                      <Icon
                        className={`${iconColor} h-5 w-5 flex-shrink-0`}
                      />
                    ),
                  }} />;
              })}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>

      {selectedBlock && <BlockView {...selectedBlock} />}
      {selectedApp && <AppView app={selectedApp} />}

    </div>
  );
};
