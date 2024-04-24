import { useEffect, useState } from "react";
import AppImages from "../../assets/images";

function TextInputField({
  type = "text",
  value,
  // value1,
  // onchange1,
  onChange,
  placeholder = "",
  style = {
    width: "w-full",
    inputStyle: "",
    labelStyle: "",
    wrapper: "",
  },
  label = "",
  id = "",
  isRequired = false,
  // showAsRequired = true,
  isDisabled = false,
  error = null,
  leadingIcon = null,
  maxLength = 80,
  minLength = 1,
  min = null,
  max = null,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [txt, setTxt] = useState("");

  const onInputChange = (e) => {
    const { value1 } = e.target;
    console.log("Input value: ", value1);

    const re = /^[A-Za-z]+$/;
    if (value1 === "" || re.test(value1)) {
      setTxt(value1);
    }
  };
  return (
    <div className={`my-2 ${style.wrapper}`}>
      {label && (
        <label
          htmlFor={id}
          className={`block my-[5px] pl-0 text-[14px] font-bold  ${style.labelStyle}`}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          type={
            type === "password" && !showPassword
              ? "password"
              : type === "password" && showPassword
              ? "text"
              : type
          }
          onChange={(e) => {
            if (typeof onChange === "function") {
              onChange(e);
            }
          }}
          placeholder={placeholder}
          value1={txt}
          // onChange1={onInputChange}
          value={value ?? ""}
          required={isRequired}
          disabled={isDisabled}
          className={`disabled:bg-white border-[1px] border-solid ${
            error ? "border-primary" : "border-black"
          } outline-black ${style.width ? style.width : ""} ${
            leadingIcon ? "pl-[4%]" : ""
          } text-black text-[14px] py-[6px] px-3 rounded-[5px] ${
            style.inputStyle
          }`}
          minLength={minLength}
          maxLength={maxLength}
          min={min}
          max={max}
        />
        {leadingIcon && (
          <span className="absolute left-[2%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
            <img src={leadingIcon} />
          </span>
        )}
        {type === "password" && (
          <span
            className="eye absolute right-[2%] top-[50%] translate-x-[-50%] translate-y-[-50%] cursor-pointer"
            onClick={(e) => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <img src={AppImages.eyeCross} alt="" className="w-[26px]" />
            ) : (
              <img src={AppImages.eye} alt="" className="w-[26px]" />
            )}
          </span>
        )}
      </div>
      {error && <p className="my-1 text-[12px] text-primary pl-4">{error}</p>}
    </div>
  );
}

export default TextInputField;
