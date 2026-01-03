import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState } from "react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  if (request.method.toUpperCase() === "HEAD") {
    return new Response(null, {
      status: responseStatusCode,
      headers: responseHeaders
    });
  }
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const Input = ({ OnAdd }) => {
  const [text, setText] = useState("");
  const handleSubmit = (e) => {
    if (text.trim() === "") return;
    e.preventDefault();
    OnAdd(text);
    setText("");
  };
  console.log("Text valie", text);
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center w-full mx-auto ", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        className: "w-50 md:w-120 rounded-lg border py-2 px-5 mx-3",
        type: "text",
        placeholder: "Add a new task...",
        value: text,
        onChange: (e) => setText(e.target.value)
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "text-xl text-white font-medium  bg-green-400 px-4 py-2 rounded-lg cursor-pointer hover:bg-green-500 max-w-fit transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
        disabled: !text.trim(),
        type: "submit",
        children: "Add"
      }
    )
  ] }) }) });
};
function TodoList({ todo, onToggle, onDelete }) {
  return /* @__PURE__ */ jsxs("div", { className: "w-[80%] md:w-[40%] mx-auto flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-green-500 transition-shadow group", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => onToggle(todo),
        className: `shrink-0 size-5 rounded border-2 flex items-center justify-center transition-colors ${todo.inputCheck ? "bg-green-500  border-green-500" : "border-gray-300 hover:border-green-400"}`,
        "aria-label": todo.inputCheck ? "Mark as incomplete" : "Mark as complete",
        children: todo.inputCheck && /* @__PURE__ */ jsx(
          "svg",
          {
            className: "size-3 text-white",
            fill: "none",
            strokeWidth: "3",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M4.5 12.75l6 6 9-13.5"
              }
            )
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(
      "span",
      {
        className: `flex-1 transition-all ${todo.status === "completed" ? "font-semibold text-green-500" : "text-gray-900"}`,
        children: todo.text
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => onDelete(todo),
        className: "shrink-0 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all p-1 rounded hover:bg-red-50",
        "aria-label": "Delete todo",
        children: /* @__PURE__ */ jsx(
          "svg",
          {
            className: "hover:text-red-500",
            xmlns: "http://www.w3.org/2000/svg",
            height: "24px",
            viewBox: "0 -960 960 960",
            width: "24px",
            fill: "#000000",
            children: /* @__PURE__ */ jsx("path", { d: "M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" })
          }
        )
      }
    )
  ] });
}
const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [currentStatus, setCurrentStatus] = useState("all");
  const addTodo = (text) => {
    const newTodo = {
      id: crypto.randomUUID(),
      text,
      status: "active",
      inputCheck: false
    };
    setTodos([newTodo, ...todos]);
  };
  const checkedToggle = (list) => {
    const updateTodos = todos.map((todo) => {
      if (todo.id === list.id) {
        list.status = list.status === "complete" ? "active" : "complete";
        list.inputCheck = !list.inputCheck;
      }
      return todo;
    });
    console.log("updateTodos", updateTodos);
    setTodos(updateTodos);
  };
  const deleteTodo = (todo) => {
    setTodos(todos.filter((list) => list.id !== todo.id));
  };
  const clearTodo = () => {
    const trashTodo = todos.filter((todo) => todo.inputCheck) ? todos.filter((todo) => !todo.inputCheck) : todos;
    setTodos(trashTodo);
  };
  const todosList = currentStatus === "all" ? todos : currentStatus === "active" ? todos.filter((list) => list.status === currentStatus) : currentStatus === "complete" ? todos.filter((list) => list.status === currentStatus) : [];
  const activeCount = todos.filter((todo) => !todo.inputCheck).length;
  const completeCount = todos.filter((todo) => todo.inputCheck).length;
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "grid justify-center items-center mx-auto p-5", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-center text-white text-3xl font-semibold", children: "Todo App" }),
      /* @__PURE__ */ jsx("h2", { className: "text-center text-gray-300 text-sm font-medium my-2", children: "Organize your tasks and stay productive" })
    ] }),
    /* @__PURE__ */ jsx(Input, { OnAdd: addTodo }),
    /* @__PURE__ */ jsxs("div", { className: "w-[80%] md:w-[37%] mx-auto   flex justify-start items-center my-2 p-1", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-gray-400 text-sm font-medium", children: [
        activeCount,
        " active,",
        " "
      ] }),
      /* @__PURE__ */ jsxs("h2", { className: "text-gray-400 text-sm font-medium", children: [
        completeCount,
        " completed",
        " "
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "w-[80%] md:w-[40%] mx-auto   flex justify-start items-center my-2 p-1", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setCurrentStatus("all"),
          type: "button",
          className: `text-md max-w-fit  px-3 mx-2 rounded-md ${currentStatus === "all" ? "bg-green-500 text-white" : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"}`,
          children: "All"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setCurrentStatus("active"),
          type: "button",
          className: `text-md max-w-fit  px-3 mx-2 rounded-md ${currentStatus === "active" ? "bg-green-500 text-white" : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"}`,
          children: "Active"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setCurrentStatus("complete"),
          type: "button",
          className: `text-md max-w-fit  px-3 mx-2 rounded-md ${currentStatus === "complete" ? "bg-green-500 text-white" : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"}`,
          children: "Completed"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-2", children: todosList?.length === 0 ? /* @__PURE__ */ jsx("div", { className: "text-center py-12 bg-white rounded-lg border border-gray-200", children: /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: currentStatus === "complete" ? "No completed tasks yet" : currentStatus === "active" ? "No active tasks" : "No tasks yet. Add one above!" }) }) : todosList?.map((todo) => /* @__PURE__ */ jsx(
      TodoList,
      {
        todo,
        onToggle: checkedToggle,
        onDelete: deleteTodo
      },
      todo.id
    )) }),
    /* @__PURE__ */ jsx("div", { className: "w-[80%] md:w-[40%] mx-auto my-2 p-2 flex justify-end items-ends", children: /* @__PURE__ */ jsx(
      "button",
      {
        onClick: clearTodo,
        type: "button",
        className: "text-red-500 text-sm hover:text-red-600",
        children: "Clear Completed"
      }
    ) })
  ] });
};
function Home() {
  return /* @__PURE__ */ jsx("div", {
    children: /* @__PURE__ */ jsx(TodoApp, {})
  });
}
const home = UNSAFE_withComponentProps(Home);
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/Todo_appassets/entry.client-wMV1gpTa.js", "imports": ["/Todo_appassets/chunk-WWGJGFF6-DaTaPSdi.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/Todo_appassets/root-D8PII2SA.js", "imports": ["/Todo_appassets/chunk-WWGJGFF6-DaTaPSdi.js"], "css": ["/Todo_appassets/root-BKKU3rSV.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/Todo_appassets/home-Ia2ozE7n.js", "imports": ["/Todo_appassets/chunk-WWGJGFF6-DaTaPSdi.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/Todo_appassets/manifest-8730304b.js", "version": "8730304b", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_optimizeDeps": false, "unstable_subResourceIntegrity": false, "v8_middleware": false, "v8_splitRouteModules": false, "v8_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/Todo_app";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
