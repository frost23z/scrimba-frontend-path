import Badge from "../components/Badge";

export default function BadgeDemo() {
  return (
    <section>
      <header>
        <h2>Badge</h2>
      </header>
      <main className="badge-demo">
        <div className="demo-item">
          <p className="demo-item-label">Square Badges</p>
          <div className="badges">
            <Badge variant="square" color="gray">
              Badge
            </Badge>
            <Badge variant="square" color="red">
              Badge
            </Badge>
            <Badge variant="square" color="yellow">
              Badge
            </Badge>
            <Badge variant="square" color="green">
              Badge
            </Badge>
            <Badge variant="square" color="blue">
              Badge
            </Badge>
            <Badge variant="square" color="indigo">
              Badge
            </Badge>
            <Badge variant="square" color="purple">
              Badge
            </Badge>
            <Badge variant="square" color="pink">
              Badge
            </Badge>
          </div>
        </div>

        <div className="demo-item">
          <p className="demo-item-label">Pill Badges</p>
          <div className="badges">
            <Badge variant="pill" color="gray">
              Badge
            </Badge>
            <Badge variant="pill" color="red">
              Badge
            </Badge>
            <Badge variant="pill" color="yellow">
              Badge
            </Badge>
            <Badge variant="pill" color="green">
              Badge
            </Badge>
            <Badge variant="pill" color="blue">
              Badge
            </Badge>
            <Badge variant="pill" color="indigo">
              Badge
            </Badge>
            <Badge variant="pill" color="purple">
              Badge
            </Badge>
            <Badge variant="pill" color="pink">
              Badge
            </Badge>
          </div>
        </div>
      </main>
    </section>
  );
}
