import Image from "next/image"
import { useEffect, useState } from "react"
import { Button } from "./button"
import { Input } from "./input"

type Props = {
  item: any
}

export function Wheel({ item }: Props) {
  const [hasInitiatedSpin, setHasInitiatedSpin] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false)
  const [luckyNumber, setLuckyNumber] = useState(0)

  const [percentage, setPercentage] = useState(item ? 80 : 0)

  const [dealValue, setDealValue] = useState(item?.node?.value * percentage / 100)

  useEffect(() => {
    let slider = document.getElementById("rotate");
    console.log(percentage)
    if(slider){
      console.log("We got the slider .... ")
      slider.style.background = `conic-gradient(
        white 0deg ${(100 - percentage) * 1.80}deg, 
        green ${(100 - percentage) * 1.80}deg 180deg, 
        green 180deg ${(percentage * 1.80)+180}deg, 
        white ${percentage * 3.60}deg 360deg)`
    }
  }, [percentage])

  useEffect(() => {
    setPercentage(!!item ? 80 : 0)
    setDealValue(item?.node?.value * percentage / 100)
  }, [item])

  useEffect(() => {
    if (hasInitiatedSpin && luckyNumber) {
      setIsSpinning(true)
      rotateSpinner(luckyNumber)
    }
  }, [ luckyNumber, hasInitiatedSpin ])

  const rotateSpinner = (luckyNumber: number) => {
    let spinnerInterval;
    let arrow = document.getElementById("wheel-arrow");
    let degrees = luckyNumber;
    let currentDegree = 0;
    let delay = 10; // Starting delay

    const intervalCallback = () => {
      arrow.style.transform = `rotate(${currentDegree}deg)`;
      currentDegree += 1;

      if (currentDegree >= degrees) {
        clearInterval(spinnerInterval);
        return;
      }

      delay += 0.01; // Decrease the delay
      delay = Math.max(delay, 1); // Set a minimum delay

      // Update the interval with the new delay
      clearInterval(spinnerInterval);
      spinnerInterval = setInterval(intervalCallback, delay);
    }

    if (arrow) {
      spinnerInterval = setInterval(intervalCallback, delay);
    }
  };

  console.log({
    item
  })

  return (
    <div className="wheel-container">
      <div className="w-[400px] h-[400px] relative mx-auto">
        <div className="wheel-center">
          {hasInitiatedSpin && (
            <>
            <div className="absolute w-[340px] h-[340px] rounded-[50%] wheel-circle-arrow flex justify-center items-center">
              <div className="w-[5px] h-full flex flex-col" id="wheel-arrow">
                  <div className=" bg-black w-[5px] flex-grow"></div>
                <div className="bg-transparent flex-grow"></div>
              </div>
            </div>
              <div className="absolute ">
                <div className="bg-white h-[70px] w-[70px] rounded-[50%] border flex justify-center items-center">
                  hello
                </div>
              </div>
            </>
          )}
          {!item ? (
            <div className="wheel-center-text">Select an Item to start </div>
          ) : (
            <>
              <div>
                {item.node.name}
              </div>
              <div style={{ height: 150, width: 150, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "contain", backgroundImage: "url('" + item.node.iconUrl + "')" }}>
              </div>
              <div>
                ${item.node.displayValue.toLocaleString()}
              </div>
            </>
          )}
        </div>
        <div id="container">
          <div id="draggable">
            <div id="rotate"></div>
            <div id="drag"></div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-10 mt-[3em]">
        <Button disabled={!item}>
          Deal for ${(item?.node?.value || 0)?.toLocaleString()}
        </Button>
        <Button disabled={!item} bgColor="blue" width={"40px"} height={"40px"} onClick={() => {
          let luckyNumber = Math.floor(Math.random() * 10000);
          setHasInitiatedSpin(true)
          setLuckyNumber(luckyNumber)
        }}>
          <div>
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.7562 7.27123C21.0325 5.55998 18.795 4.46498 16.3875 4.15373C13.98 3.84248 11.5375 4.33248 9.4375 5.54998C8.0325 6.36248 6.8575 7.48998 5.9375 8.80498V6.23123C5.9375 5.71373 5.5175 5.29373 5 5.29373C4.4825 5.29373 4.0625 5.71373 4.0625 6.23123V11.2312C4.0625 11.7487 4.4825 12.1687 5 12.1687H5.5625C5.60875 12.1725 5.6525 12.1725 5.6975 12.1687H10C10.5175 12.1687 10.9375 11.7487 10.9375 11.2312C10.9375 10.7137 10.5175 10.2937 10 10.2937H7.16625C7.96 9.00998 9.06 7.93498 10.3762 7.17248C12.1212 6.16248 14.1488 5.75498 16.1475 6.01373C18.1463 6.27248 20.0038 7.18123 21.4363 8.60248C22.8688 10.0237 23.795 11.8775 24.0725 13.8787C24.1437 14.3912 24.6175 14.75 25.13 14.6787C25.6425 14.6075 26.0012 14.1337 25.93 13.6212C25.595 11.2137 24.48 8.98248 22.7562 7.27123Z" fill="black" />
              <path d="M25.0003 17.8125H20.0003C19.4828 17.8125 19.0628 18.2325 19.0628 18.75C19.0628 19.2675 19.4828 19.6875 20.0003 19.6875H22.844C22.049 20.9788 20.9478 22.0613 19.624 22.8275C17.879 23.8375 15.8515 24.245 13.854 23.9863C11.8553 23.7275 9.99777 22.8188 8.56527 21.3975C7.13277 19.9763 6.20652 18.1225 5.92902 16.1213C5.85777 15.6088 5.38402 15.25 4.87152 15.3213C4.35902 15.3925 4.00027 15.8663 4.07152 16.3788C4.40527 18.7863 5.52027 21.0175 7.24402 22.7288C8.96777 24.44 11.2053 25.535 13.6128 25.8463C16.0203 26.1575 18.4628 25.6675 20.5628 24.45C21.9678 23.6363 23.1428 22.51 24.0615 21.195V23.75C24.0615 24.2675 24.4815 24.6875 24.999 24.6875C25.5165 24.6875 25.9365 24.2675 25.9365 23.75V18.75C25.9378 18.2325 25.5178 17.8125 25.0003 17.8125Z" fill="black" />
            </svg>
          </div>
        </Button>
        <Button disabled={!item}>
          <div>
            <input type="checkbox" name="" id="" />
          </div>
          <div>
            Quick Spin
          </div>
        </Button>
      </div>
      <div className="bg-[#F7F7F8] p-10">
        <Input label="Chance" defaultValue={percentage.toString()} formtter={(value) => (value)+"%" } setter={setPercentage}></Input>
        <Input label="Price" defaultValue={dealValue} formtter={(value: number) => "$"+(value.toLocaleString()) } setter={(value) => {
          setPercentage(Math.floor((parseInt(value) / item?.node?.value) * 8))
          setDealValue(item?.node?.value * (value / item?.node?.value))
        }}></Input>
        <input type="range" value={percentage} name="" id="" min={20} max={80} className="w-full" onChange={(e) => {
          setPercentage(e.target.value)
          setDealValue(item?.node?.value * (e.target.value / 100))
        }}
          />
      </div>
    </div>
  )
}