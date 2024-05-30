"use client";
import ReagentDemo from "@useportal/reagent-react/demo";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  return (
    <ReagentDemo
      activeAgentId={"default"}
      setActiveAgentId={(id) => {
        router.push(`/chat/${id}`);
      }}
    />
  );
};

export default Home;
