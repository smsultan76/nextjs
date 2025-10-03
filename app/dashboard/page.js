import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    // Example: fetch user details with token
    fetch("http://127.0.0.1:8000/api/user", {  // your protected API endpoint
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          setUser(data);
        } else {
          localStorage.removeItem("token");
          router.push("/login");
        }
      });
  }, [router]);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {user.name}</p>
      <button onClick={() => {
        localStorage.removeItem("token");
        router.push("/login");
      }}>
        Logout
      </button>
    </div>
  );
}