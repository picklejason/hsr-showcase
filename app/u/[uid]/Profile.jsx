'use client'

import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import CharacterCard from "./CharacterCard";
import html2canvas from "html2canvas";
import { saveAs } from 'file-saver';

const Profile = () => {
  const ref = useRef(null)

  const saveImage = useCallback(() => {
    if (ref.current === null) {
      return
    }

    html2canvas(ref.current, {
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
    }).then((canvas) => {
      canvas.toBlob(function (blob) {
        saveAs(blob, "showcase.png");
      });
    });

  }, [ref])

  const router = useRouter();
  const asset_url = "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/"
  const [data, setData] = useState(null);
  const [character, setCharacter] = useState(null);

  const params = useParams();
  const uid = params.uid;

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/u/${uid}`);
      const data = await res.json();
      setData(data);
    };

    fetchData();
  }, [data]);

  return ( 
    <div className="min-h-screen font-sans font-semibold">  
      <div className="h-auto flex justify-center items-center min-h-screen">
        <div className="flex overflow-auto">
          <div className="flex flex-col md:items-center my-5">
            <div className="flex flex-col text-white justify-center items-center w-[600px] h-auto gap-4">
              <Image src={asset_url + data?.player.avatar.icon} width={120} height={120} alt="Avatar Icon" />
              <span className="text-3xl">{data?.player.nickname}</span>

              <div className="flex flex-row justify-evenly w-full text-center">
                <div className="flex flex-col">
                    <span className="text-2xl text-neutral-400">Trailblaze Level</span>
                    <span className="text-xl">{data?.player.level}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-2xl text-neutral-400">Equilibrium Level</span>
                    <span className="text-xl">{data?.player.world_level}</span>
                </div>
              </div>
              <div className="flex flex-col w-3/4 gap-2">
                <span className="text-2xl text-neutral-400">Trailblaze Records</span>
                <div className="flex flex-row justify-between">
                  <span className="text-xl">Characters Owned</span>
                  <span className="text-xl">{data?.player.space_info.avatar_count}</span>
                </div>
                <div className="flex flex-row justify-between">
                  <span className="text-xl">Achievements Unlocked: </span>
                  <span className="text-xl">{data?.player.space_info.achievement_count}</span>
                </div>
              </div>  
            <div className="flex flex-col gap-2">
              <span className="text-2xl">UID {data?.player.uid}</span>
              <div
                className="
                  flex
                  flex-row
                  justify-center
                  cursor-pointer 
                  rounded-full 
                  bg-stone-800 
                  px-3 
                  py-1 
                  shadow-md 
                  shadow-stone-900 
                  hover:brightness-110 
                  active:shadow-none
                  gap-2
                "
                onClick={() => router.push("/")}
              >
                <Image
                  src={asset_url + "icon/sign/ReplacementIcon.png"}
                  alt="Change UID Icon"
                  width={24}
                  height={24}
                />
                <span> Change UID </span>
              </div>
            </div>
          
            <div className="flex flex-row gap-6 p-6">
              {data?.characters.map((character, index) => (
                <Image 
                  src={asset_url + character.icon} 
                  alt="Character Preview"
                  width={96}
                  height={96}
                  className="rounded-full cursor-pointer"
                  onClick={() => setCharacter(data?.characters[index])}
                  key={character.id}
                  />
              ))}
            </div>
            </div>
              {
                character && (
                  <> 
                    <div className="showcase" ref={ref} >
                      <CharacterCard character={character}/>  
                    </div>
                    <div className="
                        flex
                        flex-row
                        justify-center
                        cursor-pointer 
                        rounded-full 
                        bg-stone-800 
                        px-3 
                        py-1 
                        my-2
                        shadow-md 
                        shadow-stone-900 
                        hover:brightness-110 
                        active:shadow-none
                        gap-2
                      "
                      onClick={() => saveImage()}
                    >
                      <Image
                        src={asset_url + "icon/sign/SettingsImageIcon.png"}
                        alt="Change UID Icon"
                        width={24}
                        height={24}
                      />
                      <span>Save Image</span>
                    </div>
                  </>
                )
              }
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;