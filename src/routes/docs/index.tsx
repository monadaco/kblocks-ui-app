import { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../../components/sidebar";
import { cn } from "../../lib/utils";
import { useGetCRDs } from "../../services/use-get-crds.ts";
import { useLocation } from "react-router-dom";
import { Logo } from "../../components/logo.tsx";
import { CRDData } from "../../types/crd.ts";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { ghcolors } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeRaw from "rehype-raw";
import { DocumentIcon, DocumentCheckIcon } from "@heroicons/react/24/outline";
import { CopyToClipboard } from "react-copy-to-clipboard";

import {
  getIconComponent,
  getResourceIconColors,
} from "../../components/hero-icon.tsx";
import Markdown from "react-markdown";
import { markdownOverrides } from "../../lib/markdown-overides.tsx";

export const Component = () => {
  const location = useLocation();
  const { getCRDs } = useGetCRDs();
  const [crds, setCRDs] = useState<CRDData[]>([]);
  const [currentCRD, setCurrentCRD] = useState<CRDData | null>(null);

  useEffect(() => {
    getCRDs().then((data) => {
      setCRDs(data);
    });
  }, []);

  useEffect(() => {
    if (!crds) {
      return;
    }
    const crdName = location.pathname.substring(
      location.pathname.lastIndexOf("/") + 1,
    );
    const current = crds.find((crd) => {
      return crd.kind.toLowerCase() === crdName.toLowerCase();
    });
    if (!current) return;
    setCurrentCRD(current);
  }, [location, crds]);

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
            <Logo
              name={"Monada"}
              iconPath={`${import.meta.env.BASE_URL}monadahq.png`}
            />
            <div className="mt-8 flex flex-col gap-2">
              {crds && (
                <div className={"text-sm font-semibold text-left"}>
                  Building Blocks
                </div>
              )}
              {crds &&
                crds.map((crd, idx) => {
                  const crdName = crd.kind;
                  const Icon = getIconComponent({ icon: crd?.icon });
                  const iconColor = getResourceIconColors({
                    color: crd?.color,
                  });
                  return (
                    <SidebarLink
                      key={idx}
                      link={{
                        label: crdName,
                        navigate: `/docs/${crdName}`,
                        icon: (
                          <Icon
                            className={`${iconColor} h-5 w-5 flex-shrink-0`}
                          />
                        ),
                      }}
                    />
                  );
                })}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-1 overflow-hidden bg-white dark:bg-neutral-900">
          {/* Parent container wrapping both markdown and metadata */}
          <div className="flex flex-row flex-1 h-full overflow-auto">
            <div className="p-2 md:p-10 text-left rounded-tl-2xl dark:border-neutral-700 flex flex-col gap-2 flex-1 w-full h-full">
              {currentCRD && (
                <Markdown
                  rehypePlugins={[rehypeRaw]}
                  children={currentCRD.readme}
                  components={{
                    ...markdownOverrides,
                    code(props) {
                      const { children, className, node, ref, ...rest } = props;
                      const [copied, setCopied] = useState(false);
                      const match = /language-(\w+)/.exec(className || "");

                      const handleCopy = () => {
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000); // reset after 2 seconds
                      };

                      return match ? (
                        <div style={{ position: "relative" }}>
                          <CopyToClipboard
                            text={String(children)}
                            onCopy={handleCopy}
                          >
                            <button
                              className={
                                "absolute top-0 right-0 bg-transparent p-1 rounded-md border-none focus:outline-none"
                              }
                            >
                              {copied ? (
                                <DocumentCheckIcon
                                  className={`${getResourceIconColors({ color: "slate" })} h-5 w-5 flex-shrink-0`}
                                />
                              ) : (
                                <DocumentIcon
                                  className={`${getResourceIconColors({ color: "slate" })} h-5 w-5 flex-shrink-0`}
                                />
                              )}
                            </button>
                          </CopyToClipboard>
                          <SyntaxHighlighter
                            {...rest}
                            PreTag="div"
                            children={String(children).replace(/\n$/, "")}
                            language={match[1]}
                            style={ghcolors}
                          />
                        </div>
                      ) : (
                        <code {...rest} className={className}>
                          {children}
                        </code>
                      );
                    },
                  }}
                />
              )}
            </div>
            {currentCRD && (
              <div className="p-2 md:p-10 text-left dark:border-neutral-700 w-64 flex-shrink-0 p-4 bg-white dark:bg-neutral-900">
                <h1 className="text-2xl font-bold mb-6 mt-4 text-blue-600">
                  CRD Metadata
                </h1>
                <div>
                  <div className="mb-4">
                    <h3 className="font-semibold text-slate-700">
                      API Version
                    </h3>
                    <p className="text-slate-500">apiextensions.k8s.io/v1</p>
                  </div>
                  <div className="mb-4">
                    <h3 className="font-semibold text-slate-700">Kind</h3>
                    <p className="text-slate-500">CustomResourceDefinition</p>
                  </div>
                  <div className="mb-4">
                    <h3 className="font-semibold text-slate-700">Group</h3>
                    <p className="text-slate-500">mygroup.example.com</p>
                  </div>
                  <div className="mb-4">
                    <h3 className="font-semibold text-slate-700">Version</h3>
                    <p className="text-slate-500">v1alpha1</p>
                  </div>
                  <div className="mb-4">
                    <h3 className="font-semibold text-slate-700">Scope</h3>
                    <p className="text-slate-500">Namespaced</p>
                  </div>
                  <div className="mb-4">
                    <h3 className="font-semibold text-slate-700">Names</h3>
                    <ul className="list-disc list-inside text-slate-500">
                      <li>Plural: myresources</li>
                      <li>Singular: myresource</li>
                      <li>Kind: MyResource</li>
                      <li>Short Names: mr</li>
                    </ul>
                  </div>
                  <div className="mb-4">
                    <h3 className="font-semibold text-slate-700">Conditions</h3>
                    <ul className="list-disc list-inside text-slate-500">
                      <li>Established: True</li>
                      <li>NamesAccepted: True</li>
                    </ul>
                  </div>
                  <div className="mb-4">
                    <h3 className="font-semibold text-slate-700">Other Info</h3>
                    <p className="text-slate-500">{"currentCRD.otherInfo"}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
