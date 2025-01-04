export default function DashboardLoading() {
  return (
    <div className="container mx-auto py-10">
      <div className="animate-pulse">
        <div className="h-8 w-64 bg-muted rounded mb-6" />
        <div className="space-y-4">
          <div className="h-4 w-full bg-muted rounded" />
          <div className="h-4 w-3/4 bg-muted rounded" />
          <div className="h-4 w-1/2 bg-muted rounded" />
        </div>
      </div>
    </div>
  );
}
