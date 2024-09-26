
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Selamat Datang di HRIS</h1>
      <p className="mt-4">Aplikasi Human Resource Information System Anda.</p>
      {/* button to move to login page */}
      <a href="/auth/login" className="mt-4 bg-blue-500 text-white p-2 rounded">
        Login
      </a>
      
    </main>
  );
}
