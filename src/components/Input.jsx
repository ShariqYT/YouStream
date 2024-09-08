"use client"

const Input = ({ id, label, type, disabled, required, register, errors, pattern, className }) => {
  return (
    <div className={`relative ${className}`}>
      <input id={id} disabled={disabled} {...register(id, { required, pattern })}
      placeholder=" " type={type} className={`peer w-full px-4 py-2 rounded-md outline-none border-[1px] bg-white transition ease-linear ${errors[id] ? "border-red-500 focus:border-red-500" : "border-zinc-500 focus:border-[#35b7ff]"} disabled:opacity-70 disabled:cursor-not-allowed`} />
      <label className={`absolute bg-white px-1 top-2 left-4 z-[1] transition ease-linear duration-100 -translate-y-5 transform origin-[0px] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 ${errors[id] ? "text-red-500" : "text-zinc-500"}`} htmlFor={id}>{label}</label>
    </div>
  )
}

export default Input
