import { X } from "@phosphor-icons/react";

function CustomDialog({
  title,
  close,
  size = "lg",
  children,
  buttonClose = true,
}) {
  const resultSize = () => {
    switch (size) {
      case "sm":
        return "w-72";
      case "md":
        return "w-96";
      case "lg":
        return "w-[500px]";
      case "xl":
        return "w-[900px]";
      case "2xl":
        return "w-[1240px]";
      default:
        return "w-[500px]";
    }
  };
  return (
    <section className="fixed left-0 top-0 z-20 flex h-full w-full items-center justify-center">
      <div
        className="fixed left-0 top-0 h-full w-full cursor-pointer bg-black/60"
        onClick={() => {
          if (buttonClose) close(false);
        }}
      ></div>
      <div
        className={`relative z-10 flex max-w-[90%] flex-col gap-3 rounded-xl border border-white/10 bg-gray-400/40 p-3 ${resultSize()}`}
      >
        {buttonClose && (
          <span className="absolute -bottom-14 left-[50%] w-fit -translate-x-[50%] cursor-pointer rounded-full border border-white/10 bg-gray-400/40 p-2 text-white hover:opacity-80">
            <X size={20} weight="bold" onClick={() => close(false)} />
          </span>
        )}
        <h4 className="text-center font-AntonRegular text-xl text-gray-300">
          {title || "~"}
        </h4>
        {Array.isArray(children)
          ? children.map((child) => {
              return child.props.name
                ? React.createElement(child.type, {
                    ...{
                      ...child.props,
                      key: child.props.name,
                    },
                  })
                : child;
            })
          : children}
      </div>
    </section>
  );
}

export default CustomDialog;
