import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

// Typed versions of useDispatch and useSelector. Use these instead of the
// plain react-redux hooks. Selectors live in cartSlice.ts.
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
