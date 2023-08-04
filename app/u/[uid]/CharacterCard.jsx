import { AiFillLock } from 'react-icons/ai';

const CharacterCard = ({ character, uid, nickname, showUID, blur }) => {
  const asset_url = 'https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/';
  const skill_types = new Map();
  character.skills.forEach((skill) => {
    skill_types.set(skill.id.slice(-1), skill.type_text);
  });
  return (
    <div className={`relative min-h-[650px] w-[1400px] overflow-hidden rounded-3xl ${blur ? 'Blur-BG' : 'BG'} `}>
      <div className="absolute bottom-2 left-4 z-10">
        <span className={`${showUID ? '' : 'hidden'} shadow-black [text-shadow:1px_1px_2px_var(--tw-shadow-color)]`}>
          {uid} · {nickname}
        </span>
      </div>
      <div className="flex flex-row items-center">
        <div className="relative min-h-[650px] w-[28%]">
          <div className="flex min-h-[650px] items-center">
            <img src={asset_url + character?.portrait} alt="Character Preview" className="scale-[1.8]" />
          </div>
          <div className="absolute right-0 top-0 pr-3 pt-1">
            <div className="flex flex-col">
              {character?.rank_icons.slice(0, character?.rank).map((rank_icon) => (
                <div
                  key={rank_icon.id}
                  className="relative my-1 flex rounded-full border-2 border-neutral-300 bg-neutral-800"
                >
                  <img src={asset_url + rank_icon} alt="Rank Icon" className="h-auto w-10" />
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              {character?.rank_icons.slice(character?.rank, 6).map((rank_icon) => (
                <div
                  key={rank_icon.id}
                  className="relative my-1 flex rounded-full border-2 border-neutral-500 bg-neutral-800"
                >
                  <img src={asset_url + rank_icon} alt="Rank Icon" className="h-auto w-10 scale-[0.9]" />
                  <div className="absolute flex h-full w-full items-center justify-center rounded-full bg-neutral-800/70">
                    <AiFillLock className="h-5 w-5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          className={`relative flex min-h-[650px] w-[72%] flex-row items-center gap-3.5 border-l-2 border-dashed border-neutral-300 border-opacity-75 pl-7 ${
            blur ? 'BG' : 'Blur-BG'
          }`}
        >
          <div className="flex min-h-[600px] w-1/3 flex-col justify-between gap-2">
            <div className="flex flex-col gap-0.5">
              <div className="flex flex-row items-center justify-between">
                <span className="text-5xl">{character?.name}</span>
                <img src={asset_url + character?.element.icon} alt="Element Icon" className="h-auto w-14" />
              </div>
              <div className="flex flex-row items-center gap-2">
                <img src={asset_url + character?.path.icon} alt="Path Icon" className="h-auto w-8" />
                <span className="text-xl">{character?.path.name}</span>
              </div>
              <div>
                <img
                  src={asset_url + 'icon/deco/Star' + character?.rarity + '.png'}
                  alt="Character Rarity Icon"
                  className="h-auto w-24"
                />
              </div>
              <div>
                <span className="text-2xl">Lv. {character?.level}</span>
                <span className="text-xl"> / </span>
                <span className="text-xl text-neutral-400">{character?.promotion * 10 + 20}</span>
              </div>
            </div>
            <div className="relative flex flex-row items-center justify-evenly">
              <div className="absolute mb-5">
                <img src={asset_url + character?.path.icon} alt="Path Icon" className="h-40 w-40 opacity-20 " />
              </div>
              <div className="flex flex-col gap-6">
                {character?.skill_trees.slice(0, 2).map((skill) => (
                  <div key={skill.id} className="flex flex-col items-center">
                    <div className="relative flex flex-col items-center">
                      <img
                        src={asset_url + skill.icon}
                        alt="Skill Icon"
                        className="z-5 h-auto w-12 rounded-full border-2 border-neutral-500 bg-neutral-800"
                      />
                      <span className="black-blur absolute bottom-4 text-sm">
                        {skill.level} / {skill.max_level}
                      </span>
                      <span className="mt-1.5 text-sm">{skill_types.get(skill.id.slice(-1))}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center">
                <div className="relative flex flex-col items-center">
                  <img
                    src={asset_url + character?.skill_trees[2].icon}
                    alt="Skill Icon"
                    className="z-5 h-auto w-12 rounded-full border-2 border-neutral-500 bg-neutral-800"
                  />
                  <span className="black-blur absolute bottom-4 text-sm">
                    {character?.skill_trees[2].level} / {character?.skill_trees[2].max_level}
                  </span>
                  <span className="mt-1.5 text-sm">{skill_types.get(character?.skill_trees[2].id.slice(-1))}</span>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                {character?.skill_trees.slice(3, 5).map((skill, index) => (
                  <div key={skill.id} className="flex flex-col items-center">
                    <div className="relative flex flex-col items-center">
                      <img
                        src={asset_url + skill.icon}
                        alt="Skill Icon"
                        className="z-5 h-auto w-12 rounded-full border-2 border-neutral-500 bg-neutral-800"
                      />
                      <span className="black-blur absolute bottom-4 text-sm">
                        {skill.level} / {skill.max_level}
                      </span>
                      <span className="mt-1.5 text-sm">{skill_types.get(skill.id.slice(-1))}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {character?.light_cone ? (
              <div className="flex flex-row items-center justify-center">
                <div className="relative flex flex-col items-center">
                  <img
                    src={asset_url + character?.light_cone?.preview}
                    alt="Light Cone Preview"
                    className="h-auto w-32"
                  />
                  <img
                    src={asset_url + 'icon/deco/Rarity' + character?.light_cone?.rarity + '.png'}
                    alt="Light Cone Rarity Icon"
                    className="absolute bottom-1 h-auto w-36"
                  />
                </div>
                <div className="flex w-3/5 flex-col gap-1 text-center">
                  <span className="text-xl">{character?.light_cone?.name}</span>
                  <span className="text-base text-[#dcc491]">Superimposition {character?.light_cone?.rank}</span>
                  <div>
                    <span className="text-lg">Lv. {character?.light_cone?.level}</span>
                    <span> / </span>
                    <span className="text-neutral-400">{character?.light_cone?.promotion * 10 + 20}</span>
                  </div>
                  <div className="flex flex-row justify-evenly">
                    {character?.light_cone?.attributes.map((attribute) => (
                      <div key={attribute.id} className="black-blur flex flex-row items-center rounded pr-1">
                        <img src={asset_url + attribute.icon} alt="Attribute Icon" className="h-auto w-6" />
                        <span className="text-sm">{attribute.display}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <span className="flex justify-center">No Light Cone Equipped</span>
            )}
            <hr className="" />
            <div className="flex flex-col items-center gap-1">
              {character?.relic_sets.map((relic_set) => (
                <div key={relic_set.id} className="flex w-3/4 flex-row justify-between text-left">
                  <span className="text-base">{relic_set.name}</span>
                  <div>
                    <span className="black-blur flex w-5 justify-center rounded px-1.5 py-0.5">{relic_set.num}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex min-h-[600px] w-1/3">
            <div className="flex w-full flex-col justify-center gap-y-2 text-lg">
              {character?.property.map((stat) => (
                <div key={stat.id} className="flex flex-row items-center justify-between">
                  <div className="flex flex-row items-center">
                    <img src={asset_url + stat.icon} alt="Stat Icon" className="h-auto w-10" />
                    <span>{stat.name}</span>
                  </div>
                  <span className="mx-3 flex-grow rounded border-[1px] border-neutral-300 opacity-50"></span>
                  <div className="flex flex-col text-right">
                    <span>{stat.display}</span>
                    <div className="flex flex-row">
                      {stat.addition && (
                        <span className="text-xs">
                          {stat.base}
                          <span className="text-blue-300"> +{stat.addition}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-1/3">
            <div className="flex flex-col justify-between gap-2.5 text-lg">
              {character?.relics.map((relic) => (
                <div
                  key={relic.id}
                  className={`black-blur relative flex flex-row items-center rounded-s-lg border-l-2 p-1 ${
                    relic.rarity == 5 ? 'border-yellow-600' : 'border-purple-600'
                  }`}
                >
                  <div className="flex">
                    <img src={asset_url + relic.icon} alt="Relic Icon" className="h-auto w-20" />
                    <img
                      src={asset_url + 'icon/deco/Star' + relic.rarity + '.png'}
                      alt="Relic Rarity Icon"
                      className="absolute bottom-2 h-auto w-20"
                    />
                  </div>
                  <div className="mx-1 flex w-1/6 flex-col items-center justify-center">
                    <img src={asset_url + relic.main_affix.icon} alt="Main Affix Icon" className="h-auto w-9" />
                    <span className="text-base text-[#f1a23c]">{relic.main_affix.display}</span>
                    <span className="black-blur rounded px-1 text-xs">+{relic.level}</span>
                  </div>
                  <div className="inline-block h-[80px] min-h-[1em] w-0.5 self-stretch bg-neutral-300"></div>
                  <div className="m-auto grid w-1/2 grid-cols-2 gap-2">
                    {relic.sub_affix.map((sub_affix) => (
                      <div key={sub_affix.id} className="flex flex-row items-center">
                        <img src={asset_url + sub_affix.icon} alt="Sub Affix Icon" className="h-auto w-7" />
                        <span className="text-sm">+{sub_affix.display}</span>
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
  );
};

export default CharacterCard;
