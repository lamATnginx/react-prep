import ShiftKnob from "@/components/ShiftKnob/ShiftKnob"

function Homepage() {
  const handleShiftComplete = (gear: number) => {
    console.log(`Shifted to gear: ${gear}`);
  };

  return (
    <div className="h-screen w-screen">
      <ShiftKnob onShiftComplete={handleShiftComplete}/>
    </div>
  )
}

export default Homepage
