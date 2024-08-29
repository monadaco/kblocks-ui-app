import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { ghcolors } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeRaw from "rehype-raw";
import { DocumentIcon, DocumentCheckIcon } from "@heroicons/react/24/outline";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { getResourceIconColors } from "./components/hero-icon";
import Markdown from "react-markdown";
import { markdownOverrides } from "./lib/markdown-overrides";
import { CRDData } from "./types/crd";

export function BlockView(currentCRD: CRDData) {
  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="flex flex-1 overflow-hidden bg-white dark:bg-neutral-900">
        {/* Parent container wrapping both markdown and metadata */}
        <div className="flex flex-row flex-1 h-full overflow-auto">
          <div className="p-2 md:p-8 text-left rounded-tl-2xl dark:border-neutral-700 flex flex-col gap-2 flex-1 w-full h-full">
            <Markdown
              rehypePlugins={[rehypeRaw]}
              children={currentCRD.readme}
              components={{
                ...markdownOverrides,
                code(props) {
                  const { children, className, ...rest } = props;

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
                          className={"absolute top-0 right-0 bg-transparent p-2 focus:outline-none"}
                        >
                          {copied ? (
                            <DocumentCheckIcon
                              className={`${getResourceIconColors({ color: "slate" })} h-5 w-5 flex-shrink-0`} />
                          ) : (
                            <DocumentIcon
                              className={`${getResourceIconColors({ color: "slate" })} h-5 w-5 flex-shrink-0`} />
                          )}
                        </button>
                      </CopyToClipboard>
                      <SyntaxHighlighter
                        {...rest}
                        PreTag="div"
                        children={String(children).replace(/\n$/, "")}
                        language={match[1]}
                        style={ghcolors} />
                    </div>
                  ) : (
                    <code {...rest} className={className}>
                      {children}
                    </code>
                  );
                },
              }} />
          </div>
          <div className="p-2 md:p-10 text-left dark:border-neutral-700 w-64 flex-shrink-0 p-4 bg-white dark:bg-neutral-900">
            <h1 className="text-2xl font-bold mb-6 mt-4">
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
        </div>
      </div>
    </div>
  );
}
