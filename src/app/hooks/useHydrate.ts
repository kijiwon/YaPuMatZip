import { useEffect, useState } from "react";

const useHydrate = () => {
  const [isMount, setIsMount] = useState(false);
  useEffect(() => {
    setIsMount(true);
  }, []);

  return isMount; // hydration이 완료되었는지를 반환 
};

export default useHydrate;