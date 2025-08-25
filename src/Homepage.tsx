import GearSelector from "@/components/GearSelector/GearSelector"

function Homepage() {
  const handleShiftComplete = (gear: number) => {
    console.log(`Shifted to gear: ${gear}`);
  };

  return (
    <div className="h-screen w-screen">
      <GearSelector onShiftComplete={handleShiftComplete}/>
    </div>
  )
}

export default Homepage
