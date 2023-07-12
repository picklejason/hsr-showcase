'use client';

import Image from "next/image";
import { AiFillLock } from "react-icons/ai";

const CharacterCard = ({ character }) => {
  const asset_url = "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/"
  return (
    <div className="w-[1600px] h-[600px] rounded-xl BG overflow-hidden">
      <div className="flex flex-row text-white items-center">

        <div className="w-1/4 z-0 relative">
          <Image 
                src={asset_url + character?.portrait} 
                alt="Character Preview"
                width={2048}
                height={2048}
                className="scale-[2.2]"
          />
        </div>

      <div className="w-[1200px] h-[600px] Blur-BG flex flex-row text-white items-center z-10 gap-5 relative">
        <div className="w-1/11 ml-2">
          <div className="flex flex-col">
            {character?.rank_icons.slice(0, character?.rank).map((rank_icon) => (
              <div key={rank_icon.id} className="flex relative my-2 rounded-full bg-neutral-600">
                <Image 
                  src={asset_url + rank_icon}
                  alt="Rank Icon"
                  width={58}
                  height={58}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col">
            {character?.rank_icons.slice(character?.rank, 6).map((rank_icon) => (
              <div key={rank_icon.id} className="flex relative my-2 rounded-full bg-neutral-600">
              <Image 
                src={asset_url + rank_icon}
                alt="Rank Icon"
                width={58}
                height={58}
              />
              <div className="flex justify-center items-center absolute bg-neutral rounded-full bg-neutral-800/70 w-full h-full">
                <AiFillLock className="w-6 h-6"/>
              </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/3 h-full flex flex-col justify-evenly">
          <div className="flex flex-col gap-1">
            <div className="flex flex-row justify-between items-center">
                <span className="text-5xl">{character?.name}</span>
                <Image 
                  src={asset_url + character?.element.icon}
                  alt="Element Icon"
                  width={56}
                  height={56}
                />
            </div>
                
            <div className="flex flex-row gap-2 items-center">
                  <Image 
                    src={asset_url + character?.path.icon}
                    alt="Path Icon"
                    width={32}
                    height={32}
                  />
                  <span className="text-xl">{character?.path.name}</span>
            </div>
            <div>
              <Image 
                src={asset_url + "icon/deco/Star" + character?.rarity + ".png"}
                alt="Relic Rarity Icon"
                width={106}
                height={21}
              />
            </div>

            <div>
              <span className="text-2xl">Lv. {character?.level} </span>
              /
              <span className="text-xl text-neutral-400"> {character?.promotion * 10 + 20}</span>
            </div>
          </div>
          <div className="flex flex-row justify-center items-center">
            <Image
              src={asset_url + character?.light_cone.preview}
              alt="Light Cone Preview"
              width={132}
              height={155}
            />
            <div className="flex flex-col text-center gap-2">
              <span className="text-xl">{character?.light_cone.name}</span>
              <span className="text-base text-[#dcc491]">Superimposition {character?.light_cone.rank}</span>
              <div>
                <span className="text-lg">Lv. {character?.light_cone.level} </span>
                / 
                <span className="text-neutral-400"> {character?.light_cone.promotion * 10 + 20}</span>
              </div>
              
              <div className="flex flex-row justify-evenly">
              {character?.light_cone.attributes.map((attribute) => (
                <div key={attribute.id} className="flex flex-col items-center black-blur p-1 rounded-lg w-1/5 ">
                  <Image
                    src={asset_url + attribute.icon}
                    alt="Attribute Icon"
                    width={24}
                    height={24}
                  />
                  <span>{attribute.display}</span>
                </div>
              ))}
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-evenly">
            {character?.skills.slice(0, 4).map((skill) => (
                <div key={skill.id} className="flex flex-col items-center ">
                  <Image
                    src={asset_url + skill.icon}
                    alt="Skill Icon"
                    width={48}
                    height={48}
                  />
                  <span>Lv. {skill.level}</span>
                  <span>{skill.type_text}</span>
                </div>
              
            ))}
          </div>
          <hr />
          <div className="flex flex-col items-center gap-1">
              {character?.relic_sets.map((relic_set) => (
                <div key={relic_set.id} className="flex flex-row justify-between w-3/4 text-center">
                  <span>{relic_set.name}</span>
                  <span className="black-blur px-1 rounded w-5">{relic_set.num}</span>
                </div>
              ))}
          </div>
        </div>
        <div className="w-1/3">
          <div className="flex flex-col gap-y-2.5 text-lg">
            {character?.property.map((stat) => (
              <div key={stat.id} className="flex flex-row justify-between">
                <div className="flex flex-row items-center">
                <Image
                  src={asset_url + stat.icon}
                  alt="Stat Icon"
                  width={36}
                  height={36}
                />
                <span>{stat.name}</span>
                </div>
                <span>{stat.display}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/3">
        <div className="flex flex-col justify-between gap-1 text-lg">
          {character?.relics.map((relic) => (
            <div key={relic.id} className="flex flex-row rounded-s-lg relative items-center space-x-4 p-2 black-blur">
              <div className="flex">
                <Image
                  src={asset_url + relic.icon}
                  alt="Relic Icon"
                  width={70}
                  height={70}
                />
                <Image 
                  src={asset_url + "icon/deco/Star" + relic.rarity + ".png"}
                  alt="Relic Rarity Icon"
                  width={72}
                  height={14}
                  className="absolute bottom-2"
                />
              </div>
              <div className="flex flex-col justify-center items-center w-1/6">
                <Image 
                      src={asset_url + relic.main_affix.icon}
                      alt="Main Affix Icon"
                      width={36}
                      height={36}
                />
                <span className="text-xl text-[#f1a23c]">{relic.main_affix.display}</span>
                <span className="text-xs black-blur px-1 rounded">+{relic.level}</span>
              </div>
              <div
                className="
                  inline-block 
                  h-[80px] 
                  min-h-[1em] 
                  w-0.5 
                  self-stretch 
                  bg-neutral-300
                "
              >
              </div>
              <div className="grid grid-cols-2 m-auto gap-2 w-1/2">
                {relic.sub_affix.map((sub_affix) => (
                  <div key={sub_affix.id} className="flex flex-row">
                    <Image 
                      src={asset_url + sub_affix.icon}
                      alt="Sub Affix Icon"
                      width={26}
                      height={26}
                    />
                    {/* <span>{sub_affix.name}</span> */}
                    <span>{sub_affix.display}</span>
                  </div>
                  
                ))}
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
    </div>
)}

export default CharacterCard;