import { useState, useCallback, useEffect, useRef } from "react";

var IG = "https://cmsassets.rgpub.io/sanity/images/dsfx7636/game_data_live/";
var DOM = {
  Fury: { c: "#DC2626", i: "\uD83D\uDD34", o: 0, bg: "#2a1010" },
  Calm: { c: "#16A34A", i: "\uD83D\uDFE2", o: 1, bg: "#0f2a18" },
  Mind: { c: "#2563EB", i: "\uD83D\uDD35", o: 2, bg: "#0f1a3a" },
  Body: { c: "#EA580C", i: "\uD83D\uDFE0", o: 3, bg: "#2a1a0a" },
  Chaos: { c: "#9333EA", i: "\uD83D\uDFE3", o: 4, bg: "#1f0a2a" },
  Order: { c: "#D4A017", i: "\uD83D\uDFE1", o: 5, bg: "#2a2510" },
  Colorless: { c: "#6B7280", i: "\u26AA", o: 6, bg: "#1a1a1a" },
};

var CI={
"Abandon":"89929cfa4417c99576477793529c6808af145919",
"Abandoned Hall":"7447b04d1e78192509e89e5ff3556368ea5c471a",
"Acceptable Losses":"b2b470bab1ae511ab9de0b1ce576e2050532a081",
"Adaptatron":"a3ddb00a2a872eaceb96469739531414aa27455d",
"Ahri, Alluring":"933f5d58cc0e27d017982306b9ae0f581c9c8d27",
"Ahri, Inquisitive":"608f786c30a7e80db87d3c2d45bc0c26b0840c5e",
"Akshan, Mischievous":"f9e79f88463c1d516b9f1b053661937676e0e1f4",
"Albus Ferros":"ec0be8d2a79196b689fccf9ee42ce8baa7e9c35e",
"Alpha Strike":"154940caa774fd8219625cf051ddcb230ffc7f02",
"Alpha Wildclaw":"39ec974dae18bf82fcc18a95044d8df04cc14d3c",
"Amateur Recital":"9372a1574aa077e8b02cc6f00a1add060ae3b520",
"Ancient Warmonger":"8ba05afcfbe6901fb4bdb736d5e61656a551f668",
"Angle Shot":"757d507b684e55e333bac0ecdf2ec9ff3ad6045c",
"Angler Beast":"68872e2119146768f8fa113376876fa64699297d",
"Annie, Fiery":"532d75dc36a16eb5954253a77366fcceac7aec62",
"Annie, Stubborn":"44eb968cf0c54e75970588b69eef5c5f5ccc9b24",
"Apprentice Smith":"3998c6171ddc7a021560d9d9600c8eced9a8d628",
"Arachnoid Horror":"ae2ec829a6714ac75e8b203631af08c0c1e1565f",
"Arena Kingpin":"db48f8c1da0e4f9804ae94398f0864859db0002a",
"Armed Assailant":"1debdef1d45f7b2a452951db39674aeb01a8dc2b",
"Ashe, Focused":"ebc033772f2005b7f39ba87ba9ea35f43df0da7a",
"Aspiring Engineer":"5d61995ae384bcee56838beb0eb6d83bf5faefad",
"Atakhan":"a0b3994aad6b6c64ace14193c1363713e6b6ede2",
"Ava Achiever":"93e91aa99eb09baa68dd95b0013a89d9ffde5240",
"Azir, Sovereign":"62c75543213df186d3f05236fda6abe8992c948e",
"Back to Back":"7f5585dcd3e9c7866e3b99cb169a0404ea4c010f",
"Bandle Tree":"538f93a34006c4afaddb890cbc75b4db222f1783",
"Beast Below":"d27a56111c68c651099d7b73b22a54a825458857",
"Bewitching Spirit":"a771917dea98b137c3f4a13e4967dccf9ee445e5",
"Bilgewater Bully":"474f66ffa1ecebd9e0341d644cb82a3b8135eece",
"Black Market Broker":"f167c95cea17981f20b767ff81c180aab8a383e2",
"Black Rose Dignitary":"b63912e07914c3ef7e2bcdb95d5521fc26c880f2",
"Blast of Power":"026f851a703601fce4142c0791e913377c170b47",
"Blastcone Fae":"fac53b2216490c99ad7ce11dc5e663a692d6c104",
"Blazing Scorcher":"15ed971e4029a92b362a81ccadf309fb81e40b81",
"Blind Monk":"b4dfd543b1cfcdefba4568fe78146e0d6e46add7",
"Block":"36f7352e715fe073631ed85be41408c9a38ab865",
"Blood Money":"0062fe2a96fc94bd8d85c01607a48e8619ed4e20",
"Blood Rush":"931b77b9ab56c3abc85686be4d2452c450f9b3e0",
"Bonds of Strength":"344034c00d9fad558e98a64efab0310ad4bac37c",
"Bounty Hunter":"f4b7f334f442d30ccea4743c641760c5533804b4",
"Brazen Buccaneer":"d481971f7560e7235e7d6934767da18daa019eff",
"Brush":"fad09d6bd9bf38e376f430ecb0b400762420d061",
"Bubble Bot":"c0fe9df24ae4b8a5b4fb8276b1bd6c5a5f5f7b2b",
"Buhru Captain":"9f5186bd42c23f75ea84186aa2cb945cc02a222e",
"Bullet Time":"96ed7f6b121a7f46003534393350838efe2776f0",
"Bushwhack":"f728959ad6d4ee6c507310000c3c9e02c0772a16",
"Caitlyn, Patrolling":"51e6bacf25d19e7c391367ff107efb9e0b9f1ff5",
"Call to Battle":"3c7e0f93c72654f786f5df37895c6e95fa9d4d60",
"Call to Glory":"ced53bc3fb15f263471067fc3868295b09e62a07",
"Called Shot":"08b859c0e21eba5a033f480702bcdd1045f6294b",
"Cannon Barrage":"07ef531829e5c6084a8d31044ebd783a9266f59e",
"Captain Farron":"4c65e2cae6748590f589ad8b26bc5a20c0d770c2",
"Card Sharp":"8bfd5dc22473d439cd78d5a3cb23ed03de66953d",
"Carrion Dredger":"84d8b6d7a9cab2b78a465a8e0caf597f3ef5a175",
"Catalyst of Aeons":"4753707323ab6f9ac572c097f29f2f76ac62f54f",
"Chemtech Enforcer":"19dcf211457d9c9c6e9ea0cd32af76c2c92a3160",
"Cithria of Cloudfield":"6f0931db65e25e0a8d8351ffb97f8deed5dc0aa9",
"Cleave":"95d476a1e88ff547fb846149619177bc7e3cea9f",
"Combat Chef":"dffa05408c0b53f62dfbb9452986342ff2d4352d",
"Combat Experience":"537b66b5f0259f80bf25b1aafb78558f4db6886a",
"Commander Ledros":"1183be5effc6275f17da09b983feb36632752af4",
"Concentrate":"5e032420b6dcbdd96dca122b4d7875868feb82ed",
"Confront":"691a38a7c344fdb5ee86e34d41321d99754286a7",
"Conscription":"1c05bff48666586a2b3552b5638deaf20d9006f7",
"Crescent Guardian":"0ff22e9a517d029fd17cfbbbc93ca2f90c2c676c",
"Crimson Pigeons":"68786cd39a886a586b401d6bf818a80bf9f9e2cd",
"Crowd Favorite":"0031569ff123a8317e1be753f0bd895501bf838b",
"Cruel Patron":"c1c2c08fa0032a245c1ffee6ba29fff2826bd468",
"Cull the Weak":"49338a4b31727c6ef50e7dbc54e7004dcd2b6f4c",
"Dancing Grenade":"8afc30b1bc7cc1841dfe11cfa29adbcc02257845",
"Danger Zone":"c4652150ba885dd346b8f3622fd0e4ada7cf767f",
"Dangerous Duo":"3c02ea9e438d407c739276b788e015ac93843651",
"Darius, Trifarian":"df878ecc25160bb7e53b254a609ec243e133e8f1",
"Dark Child - Starter":"89963e1d1cffd69c620fb5d6b037f50d5c334463",
"Daughter of the Void":"a576472c7bb00f475882ac814e1d8f9be233b402",
"Dauntless Vanguard":"cb19a57b58370952cb37fff27375826d5c274129",
"Deadly Flourish":"81195df7122beaba38ebc8b8212ceb0e7593afe9",
"Deathgrip":"695304200c6fd3b287bd319ac564d31936b23d66",
"Decisive Strike":"986782271be078c184a8d1c196e375106459c6c5",
"Desert's Call":"b38ab6c02238b5a8e456cdad9b5108bb30e718bc",
"Determined Sentry":"b491c050b8505c52000c5ad7bb5a0b7855fa4ad1",
"Diana, Lunari":"3e284397713abb21d2c8d9b85202ab65d21689e9",
"Diana, No Longer Human":"d9082f75895c8645e05c0a38edc1b1c83c508d84",
"Disarming Rake":"523732db17d8cf3c7c55f57c5dfb397b73e2b116",
"Discipline":"8b9613970b505e3ad6abe2d51d091778314a7d48",
"Disintegrate":"a27374ac3a81f3dfefb43c3c3237c23b4883cb5a",
"Disposal Order":"de7b7c683f16a297418bc9a326178c520f17ef2b",
"Divine Judgment":"995778eea2e24fdc62ade38c2baa25b9f1e6ab79",
"Double Trouble":"64e977213f50471ad7b6e8664488fb9017693f71",
"Downstage Dramatics":"d76418eabcddbea148f3331913223b79a39aabda",
"Downwell":"950eff0d07ef1e25be46fdb340fe8510c551c159",
"Drag Under":"2400881960412ada4c1d1066105f206b02f8998a",
"Dragon's Rage":"7f4cbd4fb340cc13b3fbe0ec0db706464d9b29f4",
"Dragonsoul Sage":"2065a3b0fef9779fed8a3d42202606a31acf59ff",
"Draven, Showboat":"7600d6cea66e8146ea2202f72cb9035cb44608a3",
"Dune Drake":"ba18bf4a5fa9777a0cb5ae69cc7e6f049bbceaa0",
"Dunebreaker":"fa17369233dfc68e011d16b7b98971a6f8743c3e",
"Dusk Rose Lab":"fa81c474ff29b9d2c42dd4e64a5789bf793e5221",
"Eager Apprentice":"cf6d5447ff3634d8c2c0216cb2e5802fb5ca0b2e",
"Eager Drakehound":"ac0fac5af309842ba91b4b8d80e1abd47622e14a",
"Eclipse":"9fcef3d1d7de3c219aabcab88d0550c9d8cd4311",
"Eclipse Herald":"bbe4fec278b8960681f97da658dc2f06ee46c4bd",
"Eminent Benefactor":"8b1a3e89fc40bb81c44f0ee232a701d85a1f209f",
"Emperor's Divide":"80f367f06549d597c7b5a77be73eb647eab34f59",
"Enthusiastic Promoter":"c03bdc371440cbf6de773b0b39010808bfdecea1",
"Evelynn, Entrancing":"1cea41a2b9c3de59a1c95ceacc59950be1d01907",
"Evershade Stalker":"d8fb687ecdb22d7497ac55a1be0db0ba33596b43",
"Existential Dread":"0a197ec3bf96e10307859e2a152c1742288b2b09",
"Ezreal, Prodigy":"b48d6242ceb84c3eae7109317d51efaf1e56c9c3",
"Facebreaker":"b7cddc717b886bb955b900ffaae4db9154a19280",
"Fading Memories":"a2b366942f1a7ec1f4bd3c1b17e10356214705d7",
"Faithful Manufactor":"b41107b7456a2a38d203983b1e504e3789d6b6ea",
"Falling Comet":"eaaf300a07d5b2927fe9a601d70f2a01b512cc7e",
"Falling Star":"9cf2d2e59e1bf839cdf5c2a77e95f5d1e871788f",
"Fate Weaver":"ab713d332b48a7526585b0be3718fea9e9f93622",
"Feral Strength":"f07842b38914f6bc73235fe07788a3fce89b4785",
"Fight or Flight":"2c3d543ab6c3809f45f3e410d59d376b4bee6de7",
"Final Spark":"4558a2dc1bb1f1b8a73ec0d82244654e84b12687",
"Find Your Center":"cd9d798b496fdce133c5b0106d636a230b6e7ebe",
"Fiora, Peerless":"9081906c24455218d9fef8c0faa04ecc85dc462c",
"Fiora, Worthy":"e38428b921717edf676bd7f9628fc61b1355814c",
"Firestorm":"a7a34129e64f0296bf2da166c2b06ed156d568db",
"First Mate":"85e2b436ea482d53563cc5fa955f2a867ee6c32f",
"Fizz, Trickster":"6d1c6615fb6ef5fb520a35b2ce76f8feee9167dc",
"Flame Chompers":"1f6f5ebd18e5daac30d62626fddd785c4b457c2b",
"Flash":"4d9cc1c13b75933e509e642213f13359350cd3f9",
"Flurry of Feathers":"77bd864b29f4975868e557e31a39b94d06a4ecb2",
"Forecaster":"3f58f0c58503e4f8caecb7ea7f77b478a1e92961",
"Forge of the Fluft":"6ad10353e7fc1337d8cc79086f8eaac1c75f5598",
"Forgotten Monument":"b0c98558fccd68c9ac93cd5b3412c31c68b5ace9",
"Fortified Position":"45363bbd907f4f3717868cb04b3cfed814b3bb32",
"Fox-Fire":"7ad9d6a46a1c54080d54950a0044da3a82e32b45",
"Frigid Touch":"1caaf42d4cc12ab9acc57dc8c572448f8d8dd34d",
"Garen, Commander":"cbf2c12d69a86566e4cda07050b2d4495e40187e",
"Gearhead":"355b97bf135b8c60afabca7e4c6ecbf1aa25b4d9",
"Gem Jammer":"9f487e8a76e6e6b9f2e32de0c9c147be42f49e59",
"Gemhand Hunter":"d824d666dc5f50c3c513c3f9722f6eafe21c6289",
"Gentle Gemdragon":"65fcaff267b7f27cbda09ad23f2449188195d28e",
"Get Excited!":"2906c932c482af17fbb2979a8c42a6992f95d6a6",
"Glasc Mixologist":"e7422fee71796aa61f8d9691d07654b901fc20f2",
"Gloomist":"d044ea46fa38cff80c39fdb0b890dd7226c22b89",
"Grand Duelist":"720df5a56619a6b53aa1217cb84446f2469b40e5",
"Grim Apothecary":"af548bbfc856e306c5feefb34eb6bd9a4e442904",
"Grim Resolve":"4705a4ef2589f2a82021f1b70dcdb7e289a88fdf",
"Grove of the God-Willow":"1574863000ab23d69cbd388a32b1a09f29f78d5f",
"Guards!":"1dc4fef81d018c6cf14f0344b51ebcdec968aab9",
"Gust":"dfd3b161ab76ba0c5d503384f1289b3395434b10",
"Gustwalker":"3f314cea0c05d2ea274a81d723299e4e20b2ebde",
"Hall of Legends":"3b6438877bd2bd95e7a3a8921ddf6bca26d3fd95",
"Hand of Noxus":"31f3c975c6f5693f6567b0ebdb66bd4dd92d730b",
"Harnessed Dragon":"00bc15bc1c2f5b8e6d1713819998df1c04864dcb",
"Heedless Resurrection":"92419d138824a7d46155b59f0e5903196d68d9f7",
"Herald of Scales":"be49bceea1d328769774fb4daac4732861f6e4fd",
"Herald of the Arcane":"913236dabf1e4f71650bbba46870fff8163e2eff",
"Heroic Charge":"944b89db8a7f7961a28e66ec4fb7d30bb863f324",
"Hextech Ray":"1e7d12693822c38377ddc8f15db23e2f9b6d560a",
"Hidden Blade":"0437ab8a0b67f43ef5483a103bbae9e57fd05822",
"Highlander":"18c0818cbbfdf26a1237b4f7703b1f035f47b014",
"Honest Broker":"b3cc9bb93888f6f276f674baa16a0e53c724ae99",
"Hostile Takeover":"56651a87166df7108ce9f945bd71390d4926770a",
"Hwei, Brooding Painter":"ddbb13ba5617cc443b9a3a51485b1697da570121",
"Iascylla":"debdbfa22e4e75822fe1fbf0e7ab14bccbbdf191",
"Icathian Rain":"8df37f633d3da734f3f2d85808a7cb9eadec1b04",
"Icevale Archer":"c14db2ae064ccee80d8ec373f9fe9b4f44776e3e",
"Immortal Phoenix":"7b623ae985bf5f362b6d8d4a17e9b8146aeae3c3",
"Imperial Decree":"fc6ab617f1ce20c82ed76dc6446d42d416c08b34",
"Imposing Challenger":"01596f6039ef5618fae686e1c7df291e1c570fc3",
"Incinerate":"46e4eaada1412f9b6c24751bdb3932c6a51e905f",
"Inferna":"5db9d66fc22887e8686a13ffdfe480106cbd3b35",
"Insightful Investigator":"3540a748211afd35b9ef4873dae0850c238fa964",
"Invert Timelines":"b916326fdcf61af4630d953c7540a4aa97e6db01",
"Inviolus Vox":"9b742ef3dc17f5da03d41e3349839037183b5ea9",
"Irelia, Fervent":"e064a9017b5d6bf0e18c4452acfca4ed8c279657",
"Isolate":"bde23f07e4869fa96b14fcab329e782894b1e1e3",
"Ivern, Friend to All":"e450956e0561ddca36558d095b71d3b60dff8b03",
"Jae Medarda":"92eac6bb020a068d9c1668b59ecaaeab05112b3f",
"Jaull-Fish":"56a31630910179a1fb2f2ddf3e6e5c9627bddf5e",
"Jax, Unrelenting":"a5796125bdb0af8ceb60cd0c5c273c6417e0f7da",
"Jayce, Man of Progress":"b508fa4e52ebbd5f66e1fc7df28cfb70acdfe1f5",
"Jeweled Colossus":"775bea14038165fd9feb15c796ed84aa00a032e1",
"Jhin, Meticulous Killer":"88fb6023ee9bd90fef3f36995ca27615dcd669f7",
"Jhin, Murderous Artist":"0e67164270e12b8d91905e977a314c7248a343e9",
"Jinx, Demolitionist":"60ff1aec7ecb1b11ff89fdb620c6182897a8b402",
"Kadregrin the Infernal":"733c32b1fccc7e2983cbb3586358152f90a6df04",
"Kai'Sa, Evolutionary":"fc4ee60eaedd5c56a9222fd07482b6a86b11baa4",
"Kai'Sa, Survivor":"ad69bde670ce218adee1d2a618a7295d2fb7bd4c",
"Karthus, Eternal":"df3497ce6a602da554813340f572240675c7f0e2",
"Katarina, Reckless":"12da73cb78a9cfa052749f317ed56a27106908c6",
"Kato the Arm":"f4ea4f2f5169a3813d9eb7f0d3d2f41bdddebfc7",
"Keeper of Masks":"67606d98bd3d8816e686dacacb91a56627d4b5f5",
"Keeper's Verdict":"90dcafd8ca6cedd534416232ebd29c451f12107c",
"Kha'Zix, Mutating Horror":"8306abc5ffce45add8c75c2e215162b2d1aed320",
"King's Edict":"ec1b8b98e1ca7a34939322883309c71605bb8bc5",
"Kinkou Initiate":"358c56479ff4a02df622827092265fe4e8373fc2",
"Kinkou Monk":"648b22c6f419ee55723247bbf4c3ac10f0be9ab5",
"Kog'Maw, Caustic":"1ba2b780619714f2bf97597a180f3b118f4faf55",
"Kraken Hunter":"51aab4710d000a9c1e665a37ef8c919ff11b0282",
"Lady of Luminosity - Starter":"44885d811b70621b188d9813b2b10b5cff1b81e6",
"Laurent Bladekeeper":"d9dac8bbc898bfead8338ef387f2d144302e278f",
"Laurent Duelist":"7b3410a1d9ee175c4853453798bcd5f09d2e217c",
"LeBlanc, Fragmented":"ee9f8d7a65e57c1d907edd4e5df2a3ea6966bff9",
"Lee Sin, Centered":"eca1aec1304de9c237751eb0aeed620b9ad0408e",
"Legion Quartermaster":"c09cc35ffc98b46f919c09e09a93b603d63eb73e",
"Legion Rearguard":"aedece01c7792c689050460db1670e6b9b15b61f",
"Leona, Zealot":"3bd1e924bec41b0f733fc8b93dc8918ce5a53ba4",
"Lillia, Fae Fawn":"b06072002316a5b86f11750bbe21e9dfb94be08d",
"Lillia, Protector of Dreams":"92cdae8b6bfef70d0a38761f1dc4aa771a37753a",
"Lilting Lullaby":"272b71b493575e38ff8888ec187cd33e54c0eacc",
"Lonely Poro":"f5ab933035b7a6d6bb1d35c10c13f58c7fbf3398",
"Loose Cannon":"30bed82f66ce9e4eae260d029d92c9d8cb1588ab",
"Lord Broadmane":"f564001228383a27372c0ddc4d8c0ed4e4843dc7",
"Lotus Trap":"9490f8c80da1bf4467e14c39b66ae4262e5f7f7b",
"Loyal Poro":"860e1afc7364a002c6305ece7b6941e2e328d0a4",
"Loyal Pup":"2f15c4508900636e1560fa0e8832aff6b3160d0f",
"Lucian, Merciless":"bc192b6e22e7a277c53f035809c59db4548a0fd5",
"Lunar Boon":"7dc31cec93a355ba52b8cf2ca0b232a0edd57586",
"Lux, Crownguard":"17d0793ad495727e67bb1c94ae0e11cd4705870f",
"Machine Evangel":"ad15d4ff89548e83dcede9b209b12233652cf3a1",
"Maddened Marauder":"0f3a2ab8e5894e0dd1b625ee29f3304e7832ef9a",
"Maduli the Gatekeeper":"20f1b46435845de99987e37125e0ef7bd61c00bb",
"Mageseeker Warden":"ae844b929f817cdf76fe40c7bf5d5fc02062bdac",
"Magma Wurm":"f6565b15f65f538804e6a56623c8aa2eedeffc22",
"Malzahar, Fanatic":"ba1fa3a18b1c2ff132ad536577e53deb49bce1f9",
"Marai Spire":"ff64dcbac9b392d4f6930a7359114aa68aa14ebe",
"Marching Orders":"b553f8e16e0ff1aaa57f74121e68954fbe45a07b",
"Master Yi, Tempered":"a21feb3555825392fdb98f868840db3827ad0389",
"Mechanized Menace":"f311115e4c527ce82010596ce462d4050a9201b2",
"Meditation":"7103336ab0d7f7bebdaa4155e4258d8d9beb06de",
"Mega-Mech":"f71db7b62798a2a10a1ab0d293c26ac9dd163c6a",
"Megatusk":"d073247bc2437443d8a9901f089632a15d11e7a0",
"Might of Demacia - Starter":"e7185deb46f17770802d06aeddfe3b929afff880",
"Minefield":"46614658b08563f07cc81a4f4fa4ec8a067710b9",
"Minotaur Reckoner":"77bb46cd667e59f26310797ac99686f3a4d19af5",
"Miss Fortune, Captain":"3c7b219245cd6c6ee835974dd74771bc605289de",
"Mister Root":"c9bb7a8f5a1426a4af9843f2473ee6cc37dd24bd",
"Mobilize":"cb22153e84ce250192b8e6e75e7f4dc0b66a728c",
"Monch":"ef10724add3b6d9e69415cb194e895f6ea9969b7",
"Monster Harpoon":"ed51ed36ad0938048ee50894d75d299c29d17759",
"Morbid Return":"33b5ca4e580b94f2056bd884a4a35e8c630920a2",
"Mosstomper":"0ea32d0f6f49c0b48b1ea2cc98fe0a3c540bc9db",
"Mountain Drake":"8a9c1d334b217e9bd0b23dfca2054de4d0b90ff1",
"Mystic Reversal":"298fe91f9d76086b7d77880e11016ed46389b61b",
"Nami, Headstrong":"c65521065700f308689608fc6c4fa8963f3264c0",
"Navori Fighting Pit":"c03ed3ddf8b764963e4b0745e86a12a5ebcef2a3",
"Needlessly Large Yordle":"952dcaf9fd4b5f3e8592d140c11d792175597da1",
"Nidalee, Cat Form":"0e51e39dfe4f922b2c8c9bff785d170350e9b803",
"Nilah, Joyful Ascetic":"6138c519310f917461e09d90fe3f2a9480914947",
"Nocturne, Horrifying":"19a751364bc6eb5297596e8733d0d30a1111ac78",
"Noxian Drummer":"45a69adf92b6951c8c8fa974273c22aade312068",
"Noxian Guillotine":"57f646b0393b58b657cfabf66357d9fc4a34e046",
"Noxus Hopeful":"c3bb6f4cb58feeb50e396d12ec9865c5434025af",
"Noxus Saboteur":"b78f0c822cb984db24ac3f1956cc8c10f8f88b22",
"On the Hunt":"3205df9cf3d12551c445a740889392264ec95b09",
"Ornn, Blacksmith":"e0621bba6475425d93191677b2b120c07a8efe20",
"Overt Operation":"69dba13c930ba3962851346d2bc6cbeb4ca48455",
"Overzealous Fan":"922d7f337fbf14f0d62d43f69ca2a1e7480dd022",
"Pakaa Cub":"156a66d7d44165367cc5a470fb35c86f337f9429",
"Party Favors":"fddcef3c55663c5d6856f6d039d19cacfd64abb5",
"Peak Guardian":"bb56433bc032fd31a957923c43babc48b66db24c",
"Perched Grimwyrm":"71af1587378c1c3feabd1b148fb776e42c7d27e8",
"Petty Officer":"29e062c4a38c0be12056568a2f8563557e2611c6",
"Pickpocket":"ebf54af997e53079e1a476feb0411d1791b20f7e",
"Piercing Light":"7fb3283b11fb8e5b5b08f9ead9b98c695b75bff0",
"Piltover Enforcer":"0febae9c611339d9ed65c7ebe43237b5ec42c9a3",
"Pit Crew":"8023223b55adc44bafe1f8c5f305d3dde6f6d114",
"Pit Rookie":"ec19eeaee85c7e5669387a3f6ccb7718f5a0f570",
"Playful Phantom":"3171ef8c7968b0dfe088725b9721b19d175bdb1e",
"Plundering Poro":"4ff9e6c73f67b505e50ec2f5f513292fe5b20b95",
"Poppy, Defender of the Meek":"1a75c5322b2179e772af83b1fd16fed864c5bf24",
"Poppy, Paragon":"ef8a8434e1a4c4262dd97213741a4b126cb1449b",
"Poro Herder":"166b718a8517fcceac7e7d4f6acbc4fa0bbc2c55",
"Portal Rescue":"bafb4c68fa9a3eb71fecd0cdffb9e20b9f68d532",
"Possession":"f26462174fd01407f25f7d49a70862d2b9af35cc",
"Pouty Poro":"d541bf3bcb5aa3ad0d48d87f5753569b72ac426f",
"Premonition":"20ad2f42bcf9a0402e2a0d5a21d55eacee9ecf35",
"Prepared Neophyte":"ad993e451437950e56935a7ecff44fea09e522b2",
"Primal Strength":"dfd910a9836cd36340d0ffdb5fe8cb92a1069963",
"Production Surge":"78783854dd9372138e599affbe96a269d8908c29",
"Progress Day":"b15f479a8f29e31b6e4c06cf2d7c8cb8630073ef",
"Promising Future":"1ea5e7e50aaecee0b2ee2657d3c829dff0718fba",
"Punch First":"d124efad90ff61d4ac29ee69fe71e48a7cd6ece2",
"Pyke, Dockside Butcher":"583f1c15c1bdc47c9d4ebb41a210c182262c8ee9",
"Raging Firebrand":"9566fc064c098bd7f3540f3074dc6353c7ca5663",
"Rally the Troops":"952476dd51338ff97774946ded134a2072b2e6c9",
"Reaver's Row":"364af10bac81e6ffb8658b0dc0db551608d207ce",
"Rebuke":"c8e1ad72e9d562f9267c1512f29e9c04dc5cc15f",
"Reckoner's Arena":"6b7d867487efcbefa8c3d67043a839497ec50388",
"Recruit the Vanguard":"81d1c47459606f7b627778cce9b5f0e44d80f7fa",
"Red Brambleback":"69d4208b748074b68f775cdfa8f1d2ba20ece8ae",
"Rek'Sai, Swarm Queen":"5470aaad3bdb7ff5d2e605b07d93cedb7254c54d",
"Renata Glasc, Mastermind":"be8f7e08562c076e8947aafc3ecd202051d17c02",
"Rengar, Pouncing":"e24eb3fb835c4762479da5608b018785ef22e02c",
"Rengar, Trophy Hunter":"7e6d106e0170e7f45341c1755f829f286d782bb7",
"Repulse":"ca56ad44ec24db67e10a4ee18f5c7f3756c83d94",
"Revna the Lorekeeper":"8e251eed411d614de504480181b357df3f78b133",
"Rhasa the Sunderer":"e34fe8a9ee533dee99f96b4e6677d1edbd6a262d",
"Riposte":"07af52eada661904b467ca118c2715435f0a3b00",
"Ripper's Bay":"f6d0540edbabcdb7d5a6859ce2f820f744cb498c",
"Rocket Barrage":"0378f9adf9df08fed264fdd217ce0e94c3f611cb",
"Rockfall Path":"a1bde66bccf2786e7c0b9d44fcdcdaa6b59f0328",
"Ruin Runner":"08abcf17d3356325b0c1b83a78a87be855e5a71a",
"Ruined Rex":"05fc9613bd3a3c3c5002ff1d7d665b37fd18dcb7",
"Rumble, Hotheaded":"e211311ecb1475e87d3d94eba4a6774b4e900091",
"Rumble, Scrapper":"6528aa0656cac59ff7299bc8bdac371238038080",
"Rune Prison":"21867baeaced3c22cda5f40f6b6c9a8dad4b7042",
"Sacrifice":"139153ae4b4f786442018c09765c67e35515df24",
"Safety Inspector":"499e65eb2d35e2bd774ea7fe2a70672234f71e90",
"Salvage":"9bdbac358e7c9415c1354b6d1f6888dcf9c5519b",
"Sandshifter":"57f72b30862074bb5d1f302e86ee3cec024cd980",
"Scorchclaw":"f69940824f8ce62a479df28988dcbdf6ea6d3960",
"Scrapyard Champion":"10f096d2b469fd73329386e5efe88c9bec667d7c",
"Sea Monkey":"0ef7f1de2bc7845f5e3dace1634c6c58a8765452",
"Sentinel Adept":"94e213b77131d9a67e51743a35fc5dff80fd79ec",
"Sett, Brawler":"ea35315d12a86cff8e37fa716c92dc76d9edceb8",
"Shadow":"690ee4937b3926810d8ed814afd14d4d9e98b13e",
"Shadow Watcher":"f6f5ff413efc57d7948b4b9a46a4bba6eebd39d2",
"Shadow's Call":"5a9a81d353131fc275313e737d55ca6e2661dce6",
"Shakedown":"ab71d92c94bf609e2fa6efc8fec06fe1e8b10108",
"Sharkling":"f2aa213fe1e54d0d6f1507c7ed8829c8ba2bc610",
"Shen, Kinkou":"25f3a9fa33201278ebf475b2d02dae8c0c0cb20c",
"Show of Strength":"d04ac6687931018fd68368c65cc024155867cab4",
"Showstopper":"c9b6f7a7cca1589fb53276f74ac8bc547b31e5ec",
"Sigil of the Storm":"9b795e7a2af421aabc01dc6f35c0b5d547fe3c0e",
"Simian Ancestor":"901a77a01e869f1f38f7a0b1ba5ae28f06b54a08",
"Sinister Poro":"7f2a623a83556bafebfbe7cb280bdedcfe116531",
"Siphon Power":"b449170ba312711c82708d1fea2b044822ce5eaa",
"Sivir, Ambitious":"484adbe28bafadf0ac37d7787c916013bd106793",
"Sivir, Mercenary":"6c0eeb81da597528625d458cb4c560298b5bea50",
"Sky Splitter":"01faae468720dd5bf5e3fe12ba56c01af70263be",
"Smite":"f46252e8c65a2eb3f476ea51f214af7651d0622d",
"Smoke Screen":"06c34457afd09b828ee0b2862ed51eb31004d888",
"Smoke and Mirrors":"38886634ee8646707d9c26020f977f14c934a4c0",
"Sneaky Deckhand":"6f95b6aac293d8e477192281df47d8466da502bf",
"Soaring Scout":"75b6ce420888035b566c3795cabe0999a9a918b0",
"Solari Chief":"02fd791fdaa7d1c63221655e889fb412de103ca2",
"Sona, Harmonious":"8582f6430821fb912fcb3619c5ce9405f254cb2f",
"Soraka, Wanderer":"fc329097625a1f98a564134945950bd3bd3610a3",
"Soul Harvest":"baee7644d00219dfa4160d59e6f6e78e55f5e619",
"Soulgorger":"439c4fa7c8c47cba41df8bce3fe3c8068d297382",
"Sprite Burst":"4427ceffae1c3e7b012167461ce7c080bb2c1fe4",
"Sprite Mother":"65c06528f88de1ac207b382d4830ccfdd08a2d12",
"Square Up":"5e14c09db2f064e5f6986f500a04335d73d459dd",
"Stacked Deck":"fdcb22cb620a4c1c37920d6b744edb615647cbd4",
"Stalking Wolf":"5f5f66caad21d59bf966ddc501bb4f9c84a595c6",
"Stand United":"4d10570e70a998de520d4baba254c3b726caa4f0",
"Star Spring":"0c4fe88ffb5c1b02b58b2c6b4f02de441ac451d6",
"Star-Crossed":"0bfa45e6e86dfc256de0163f96273b761e9592fb",
"Stare Down":"58d0353a966bb0ca292855a0a55de5769e28d155",
"Startipped Peak":"05adde1d8ab40e2a2f832a89ac5c9174ee78796f",
"Stormbringer":"d86c4137cc7f77f103cd7d6228125df8cb9a54e1",
"Stupefy":"837a5976192bbf8bdb4086429802167548ecc119",
"Sudden Storm":"ba3e8c3e95137a289dbdec88e96e5c5a9a45f2c7",
"Sunken Temple":"06f6d17929d19000006cf281d013ecbe1543af0e",
"Super Mega Death Rocket!":"95d6fd4d7944e759cfe7ee5e208fa329b719333b",
"Tactical Retreat":"cd5abf6c27f5faac247f6044306db3d710fb9d61",
"Taric, Protector":"7d08e3f64401cb87b8a0564a1cbe6fc94aee03a7",
"Tasty Faefolk":"65f69ca9a1087deb12e91fb6fdee7b6efd0c088f",
"Teemo, Scout":"404a8aa0061b58611bd913b58dd01d99fdb8087d",
"Teemo, Strategist":"5e31f0ea037604aa531d84c1d56d26f255210b7c",
"Temptation":"4d5075a540ff5e4a2daec598cb6400fbb6570673",
"The Academy":"82646c995f3d0b897ce97f7b68c35f5fd9384b8e",
"The Candlelit Sanctum":"f14fe78f2b7f3909eadb07bce24bd582e190653d",
"The Grand Plaza":"f9ca8d04cb269ad99bca7e6dae874cad1bec336a",
"The Harrowing":"6914034f56dd50ab37df26e3541c997479bb5a6d",
"The Papertree":"c395b94a4f78b4e8b0590b56787c33600b18e358",
"Thousand-Tailed Watcher":"b20e5644c33924a58e0497dd9f7db19723147003",
"Thrill of the Hunt":"2753c2b3ea4fd55e5225a4451a29736b5c3434a8",
"Tianna Crownguard":"2a1876aeedae7310409d0eaaf453507188b0c82b",
"Tideturner":"bad355dba8b32d1fba33dc3924cad6a34b61b5af",
"Time Warp":"b97bbcf3cf6cb6e5f4baaa1bfbb85dc860eb950b",
"Towering Pairofant":"47ac3971efe67f7910771709b8bb9a5df5b63952",
"Trapping Grounds":"234bb01e24892aefa024ae402f6ee7703ccdbbd4",
"Traveling Merchant":"b7dbebe2bf5691391c8e4146e478b8bd2ac40aef",
"Treasure Hunter":"c4e1bf257379b4612a1c58f0480480d9b698196c",
"Trevor Snoozebottom":"fa843ee80d1a35416d61482bc1602279955a2c7f",
"Tricksy Tentacles":"7e1e77df44c076599fa780f7fd01a4550f67af45",
"Trifarian Gloryseeker":"19ad6a0e743b56021b9651a2105034a488e172e8",
"Trusty Ramhound":"0bd3f82ebe45a4dc09204582d06900916e6c0480",
"Tryndamere, Barbarian":"124c93495c927be1baea03fdacf6c7b283cf8b6c",
"Undercover Agent":"3e4e318c0cc97b13646ee454da71046a09236e47",
"Undying Legion":"3a6955daff2982e0ba4417533052d5ea334232fb",
"Undying Loyalty":"703b85f8284ed13865012289d03602e2cd24f4b2",
"Unforgiven":"6a06599a299b15175984c1e38d27a3be21258fbe",
"Unsung Hero":"2a227ef7494af6409000c13c4f3d1094cec3a3a8",
"Unyielding Spirit":"9afea96ec04ce0c2ee76c4affbf4e6df470e7647",
"Vanguard Captain":"f0c9ddb2af7a0d4991938cf1e3058eb0f5d2e357",
"Vanguard Sergeant":"6bcff5c718cfcff1c2466bf5e1a2a1ea9a9cf09b",
"Vault Breaker":"8046c9f133be83268d7dc9788abea58f461914d8",
"Vayne, Hunter":"75f9eac062e43105ee602b6050fe230fb8d2dce5",
"Veiled Temple":"6f2b38874a09b3e3df3fe584ea77e84aa5423e37",
"Vengeance":"a21e2ffee47ecdd1575bf48edb8c2a84722cc6b9",
"Veteran Poro":"54b8aa5aa80e74e0c545d4c484353c5b9e78bdfc",
"Vex, Apathetic":"9dd2a50fcfe6258ef934bdcf73b2fdb19d18ea94",
"Vex, Cheerless":"e9025578c7b5845a1a9c9a83e045bcbe71a76e71",
"Vi, Destructive":"7ab52254ac49b8853fc7ae65b03aaee3f8c5994a",
"Vi, Hotheaded":"03a55e8d494d7efe20da792365161f5c43c20779",
"Vi, Peacekeeper":"6bde3fc4f76015d36d70e86c8fbcc3b6b7aa43dd",
"Viktor, Innovator":"12dfa6b38edc9b23f216c0a1828474f7506d49c0",
"Viktor, Leader":"ab390d6d074c3f07abba000cc166faa1796ec464",
"Vilemaw":"229efda03d93b27741b8f9e86e1151b5c2a5095f",
"Vilemaw's Lair":"f374b90a0bec11a5f423e7d4ebd869ab1a146471",
"Void Assault":"0b79108a9492fb34866cc63815b57bfab8a5aeae",
"Void Gate":"14a52a367fd41fd84745e050e62d1f281f733467",
"Void Hatchling":"a909782d0a30f31f9414c99ba143fa570a3cb456",
"Void Rush":"ce606f096ae76485cd8dd3cc337629b510f0d1e7",
"Void Seeker":"5b64b63c6be58ff3c33c7fb3c2dcb168d64e287e",
"Volibear, Imposing":"faceb90b6a46e79eadba43871b8cffe1ec5037a7",
"Voracious Gromp":"3c006b8c9aa4581ad90c258cc6cfac9098d3c296",
"Wages of Pain":"aef5c891bd6f7cbc3a97b1e01688868316599929",
"Wallop":"7bbd2eb8ce224e1872a1c920d7c64d796b2355cd",
"Watchful Sentry":"d84da2c62b1e218a0a74b227c49ce8a953918ebd",
"Whirlwind":"24f5e0a8811b5a0e0930c0f6476600e2a37a5f93",
"Wildclaw Shaman":"7abc938fee4ba397f52c8ea60d350857a7517b0c",
"Wily Newtfish":"4a0b0ebe9f47dadeb3b5f0520ec566a528df9c94",
"Wind Wall":"72c4dbe48d06916c847dab40340e5f05228fadfe",
"Windsinger":"e47c9a3956f8fbb77daa5fdb2ee433dd1772f247",
"Windswept Hillock":"aba557a4053fd76c6aa95b2b907ec682bad70d9f",
"Wuju Apprentice":"543789dd1b4b2654392a151d4bb1b0c6263c47dc",
"Wuju Bladesman - Starter":"8231ced23eaf22ca3bf62ec8cb86b83a3e222da6",
"Xerath, Freed":"ef52e66a137a80cf5df862f31a114bfc00914a93",
"Yasuo, Remorseful":"3f2cff3ff3b146c8bfe11594e37e9d8109884273",
"Yasuo, Windrider":"f5ba378ce4dad16d17e001814e091d5f484f2681",
"Yeti Brawler":"38b59ae384ef6df8c94d5c51418101b2630b43a7",
"Yi, Honed":"0e16976cd6d7ee5a874be9351b428671990fbd25",
"Yone, Blademaster":"0e8efd9af74b65170e04eed45844e6d7e2c4d70b",
"Zaun Punk":"af4eec8bb065708bf790b940fa065ea3e735afa0",
"Zaun Warrens":"458ee40086c77b43b98c2decbaf33a4aa2359bb9",
};
var DB=[
{n:"Abandon",t:"Spell",d:"Chaos",ds:["Chaos"],e:2,m:null,kw:["Reaction"],tx:"[Reaction] (Play any time, even before spells and abilities resolve.)Counter a spell. Return it to its owner's hand instead of putting it in their tra"},
{n:"Abandoned Hall",t:"Battlefield",d:"Colorless",ds:["Colorless"],e:null,m:null,kw:[],tx:"When a player plays a spell, they may give a unit they control here +1 M this turn."},
{n:"Acceptable Losses",t:"Spell",d:"Chaos",ds:["Chaos"],e:1,m:null,kw:["Action"],tx:"[Action] (Play on your turn or in showdowns.)Each player kills one of their gear."},
{n:"Adaptatron",t:"Unit",d:"Calm",ds:["Calm"],e:4,m:3,kw:[],tx:"When I conquer, you may kill a gear. If you do, buff me. (If I don't have a buff, I get a +1 M buff.)"},
{n:"Ahri, Alluring",t:"Unit",d:"Calm",ds:["Calm"],e:5,m:4,kw:[],tx:"When I hold, you score 1 point."},
{n:"Ahri, Inquisitive",t:"Unit",d:"Mind",ds:["Mind"],e:3,m:3,kw:[],tx:"When I attack or defend, give an enemy unit here -2 M this turn, to a minimum of 1 M."},
{n:"Akshan, Mischievous",t:"Unit",d:"Body",ds:["Body"],e:4,m:4,kw:[],tx:"[Weaponmaster]You may pay BodyBody as an additional cost to play me.When you play me, if you paid the additional cost, move an ene"},
{n:"Albus Ferros",t:"Unit",d:"Order",ds:["Order"],e:4,m:3,kw:[],tx:"When you play me, spend any number of buffs. For each buff spent, channel 1 rune exhausted."},
{n:"Alpha Strike",t:"Spell",d:"Calm",ds:["Calm", "Body"],e:3,m:null,kw:["Action"],tx:"[Action] (Play on your turn or in showdowns.)Choose a friendly unit. It deals damage equal to its Might split among enemy units at battlefields. Then "},
{n:"Alpha Wildclaw",t:"Unit",d:"Calm",ds:["Calm"],e:6,m:7,kw:["Tank"],tx:"[Tank] (I must be assigned combat damage first.)Your units here with less Might than me can't be chosen by enemy spells and abilities."},
{n:"Amateur Recital",t:"Battlefield",d:"Colorless",ds:["Colorless"],e:null,m:null,kw:[],tx:"When you hold here, you may move a unit at a battlefield to its base."},
{n:"Ancient Warmonger",t:"Unit",d:"Chaos",ds:["Chaos"],e:5,m:4,kw:["Accelerate"],tx:"[Accelerate] (You may pay 1Chaos as an additional cost to have me enter ready.)I have [Assault] equal to the number of enemy uni"},
{n:"Angle Shot",t:"Spell",d:"Fury",ds:["Fury"],e:2,m:null,kw:["Reaction"],tx:"[Reaction] (Play any time, even before spells and abilities resolve.)Choose a unit and an Equipment with the same controller. Attach that Equipment to"},
{n:"Angler Beast",t:"Unit",d:"Chaos",ds:["Chaos"],e:5,m:5,kw:[],tx:"When you play me, return all units with 2 M or less to their owners' hands."},
{n:"Annie, Fiery",t:"Unit",d:"Fury",ds:["Fury"],e:5,m:4,kw:[],tx:"Your spells and abilities deal 1 Bonus Damage. (Each instance of damage the spell deals is increased by 1.)"},
{n:"Annie, Stubborn",t:"Unit",d:"Chaos",ds:["Chaos"],e:4,m:3,kw:[],tx:"When you play me, return a spell from your trash to your hand."},
{n:"Apprentice Smith",t:"Unit",d:"Calm",ds:["Calm"],e:2,m:2,kw:[],tx:"When I move, reveal the top card of your Main Deck. If it's a gear, draw it. Otherwise, recycle it."},
{n:"Arachnoid Horror",t:"Unit",d:"Body",ds:["Body"],e:6,m:6,kw:[],tx:"[Hunt 2] (When I conquer or hold, gain 2 XP.)I can be played to an occupied battlefield if an enemy unit is alone there.Friendly units can be played t"},
{n:"Arena Kingpin",t:"Unit",d:"Fury",ds:["Fury"],e:5,m:3,kw:[],tx:"I enter ready.[T] Give a unit +3 M this turn."},
{n:"Armed Assailant",t:"Unit",d:"Fury",ds:["Fury"],e:6,m:6,kw:["Accelerate"],tx:"[Accelerate] (You may pay 1Fury as an additional cost to have me enter ready.)[Weaponmaster] (When you play me, you may [Equip] "},
{n:"Ashe, Focused",t:"Unit",d:"Order",ds:["Order"],e:5,m:4,kw:[],tx:"When you play me, choose an opponent. They reveal their hand. Choose a card revealed this way and banish it. When they hold, return it to their hand ("},
{n:"Aspiring Engineer",t:"Unit",d:"Mind",ds:["Mind"],e:3,m:3,kw:[],tx:"When you play me, return a gear from your trash to your hand."},
{n:"Atakhan",t:"Unit",d:"Order",ds:["Order"],e:10,m:7,kw:["Ganking"],tx:"You may kill a friendly unit as an additional cost to play me. If you do, I cost 1 less for each Energy it costs and Order less "},
{n:"Ava Achiever",t:"Unit",d:"Mind",ds:["Mind"],e:5,m:4,kw:["Hidden"],tx:"When I attack, you may pay Mind to play a card with [Hidden] from your hand, ignoring its cost. If it’s a unit, play it here."},
{n:"Azir, Sovereign",t:"Unit",d:"Order",ds:["Order"],e:4,m:4,kw:["Accelerate"],tx:"[Accelerate] (You may pay 1Order as an additional cost to have me enter ready.)When I attack, you may move any number of your to"},
{n:"Back to Back",t:"Spell",d:"Order",ds:["Order"],e:3,m:null,kw:["Reaction"],tx:"[Reaction] (Play any time, even before spells and abilities resolve.)Give two friendly units each +2 M this turn."},
{n:"Bandle Tree",t:"Battlefield",d:"Colorless",ds:["Colorless"],e:null,m:null,kw:[],tx:"You may hide an additional card here."},
{n:"Beast Below",t:"Unit",d:"Chaos",ds:["Chaos"],e:7,m:8,kw:[],tx:"When you play me, return another friendly unit and an enemy unit to their owners' hands."},
{n:"Bewitching Spirit",t:"Unit",d:"Chaos",ds:["Chaos"],e:3,m:2,kw:[],tx:"When you play me, choose a player. They discard 1."},
{n:"Bilgewater Bully",t:"Unit",d:"Body",ds:["Body"],e:6,m:6,kw:["Ganking"],tx:"While I'm buffed, I have [Ganking]. (I can move from battlefield to battlefield.)"},
{n:"Black Market Broker",t:"Unit",d:"Chaos",ds:["Chaos"],e:3,m:3,kw:[],tx:"When you play a card from face down, play a Gold gear token exhausted."},
{n:"Black Rose Dignitary",t:"Unit",d:"Order",ds:["Order"],e:3,m:2,kw:["Deathknell"],tx:"[Assault] (+1 M while I'm an attacker.)[Deathknell][ ] Channel 1 rune exhausted. (When I die, get the effect.)"},
{n:"Blast of Power",t:"Spell",d:"Order",ds:["Order"],e:6,m:null,kw:["Action"],tx:"[Action] (Play on your turn or in showdowns.)Kill a unit at a battlefield."},
{n:"Blastcone Fae",t:"Unit",d:"Mind",ds:["Mind"],e:2,m:2,kw:["Hidden"],tx:"[Hidden] (Hide now for Power to react with later for 0.)When you play me, give a unit -2 M this turn, to a minimum of"},
{n:"Blazing Scorcher",t:"Unit",d:"Fury",ds:["Fury"],e:5,m:5,kw:["Accelerate"],tx:"[Accelerate] (You may pay 1Fury as an additional cost to have me enter ready.)"},
{n:"Blind Monk",t:"Legend",d:"Calm",ds:["Calm", "Body"],e:null,m:null,kw:[],tx:"1, [T] Buff a friendly unit. (If it doesn't have a buff, it gets a +1 M buff.)"},
{n:"Block",t:"Spell",d:"Calm",ds:["Calm"],e:2,m:null,kw:["Hidden", "Action", "Shield 3", "Tank"],tx:"[Hidden] (Hide now for Power to react with later for 0.)[Action] (Play on your turn or in showdowns.)Give a unit [Shield 3] an"},
{n:"Blood Money",t:"Spell",d:"Order",ds:["Order"],e:2,m:null,kw:["Action"],tx:"[Action] (Play on your turn or in showdowns.)Kill a unit at a battlefield with 2 M or less. If it was an enemy unit, play a Gold gear token e"},
{n:"Blood Rush",t:"Spell",d:"Fury",ds:["Fury"],e:1,m:null,kw:["Action", "Assault 2"],tx:"[Action] (Play on your turn or in showdowns.)[Repeat] 1 (You may pay the additional cost to repeat this spell's effect.)Give a unit [Assau"},
{n:"Bonds of Strength",t:"Spell",d:"Order",ds:["Order"],e:2,m:null,kw:["Reaction"],tx:"[Reaction] (Play any time, even before spells and abilities resolve.)[Repeat] 2 (You may pay the additional cost to repeat this spell's ef"},
{n:"Bounty Hunter",t:"Legend",d:"Body",ds:["Body", "Chaos"],e:null,m:null,kw:["Ganking"],tx:"[T] Give a unit [Ganking] this turn. (It can move from battlefield to battlefield.)"},
{n:"Brazen Buccaneer",t:"Unit",d:"Fury",ds:["Fury"],e:6,m:5,kw:[],tx:"As you play me, you may discard 1 as an additional cost. If you do, reduce my cost by 2."},
{n:"Brush",t:"Battlefield",d:"Colorless",ds:["Colorless"],e:null,m:null,kw:[],tx:"Bird, Cat, Dog, Poro, and Ivern units here have +1 M.When you score here, you may replace this with the battlefield it replaced."},
{n:"Bubble Bot",t:"Unit",d:"Mind",ds:["Mind"],e:3,m:3,kw:[],tx:"When you play me, ready another friendly Mech."},
{n:"Buhru Captain",t:"Unit",d:"Body",ds:["Body"],e:3,m:3,kw:[],tx:"When you play me, you may draw 1 or buff me. (To buff a unit, give it a +1 M buff if it doesn't already have one.)"},
{n:"Bullet Time",t:"Spell",d:"Body",ds:["Body", "Chaos"],e:1,m:null,kw:["Action"],tx:"[Action] (Play on your turn or in showdowns.)Pay any amount of Power to deal that much damage to all enemy units at a battlefield."},
{n:"Bushwhack",t:"Spell",d:"Fury",ds:["Fury"],e:2,m:null,kw:["Hidden"],tx:"[Hidden] (Hide now for Power to react with later for 0.)Friendly units enter ready this turn. Play a Gold gear token exhausted"},
{n:"Caitlyn, Patrolling",t:"Unit",d:"Calm",ds:["Calm"],e:3,m:3,kw:[],tx:"I must be assigned combat damage last.[T] Deal damage equal to my Might to a unit at a battlefield. Use this ability only while I'm at a bat"},
{n:"Call to Battle",t:"Spell",d:"Body",ds:["Body"],e:3,m:null,kw:[],tx:"Move a unit you control to a battlefield you control. Then, choose an opponent. They move a unit they control to the same battlefield."},
{n:"Call to Glory",t:"Spell",d:"Order",ds:["Order"],e:3,m:null,kw:["Reaction"],tx:"[Reaction] (Play any time, even before spells and abilities resolve.)As you play this, you may spend a buff as an additional cost. If you do, ignore t"},
{n:"Called Shot",t:"Spell",d:"Chaos",ds:["Chaos"],e:0,m:null,kw:["Action"],tx:"[Action] (Play on your turn or in showdowns.)[Repeat] Chaos (You may pay the additional cost to repeat this spell's effect.)Look at the top "},
{n:"Cannon Barrage",t:"Spell",d:"Body",ds:["Body"],e:2,m:null,kw:["Reaction"],tx:"[Reaction] (Play any time, even before spells and abilities resolve.)Deal 2 to all enemy units in combat."},
{n:"Captain Farron",t:"Unit",d:"Fury",ds:["Fury"],e:4,m:5,kw:[],tx:"Other friendly units here have [Assault]. (+1 M while they're attackers.)"},
{n:"Card Sharp",t:"Unit",d:"Mind",ds:["Mind"],e:3,m:3,kw:[],tx:"When you play me, you and each opponent may play a Gold gear token exhausted. For each opponent who did, you play a Gold gear token exhausted."},
{n:"Carrion Dredger",t:"Unit",d:"Order",ds:["Order"],e:2,m:1,kw:["Deathknell", "Deflect", "Deflect"],tx:"[Deathknell][ ] Play a 1 M Bird unit token with [Deflect] to your base. (When I die, get the effect. Opponents must pay Power to "},
{n:"Catalyst of Aeons",t:"Spell",d:"Body",ds:["Body"],e:4,m:null,kw:[],tx:"Channel 2 runes exhausted. If you couldn't channel 2 runes this way, draw 1."},
{n:"Chemtech Enforcer",t:"Unit",d:"Fury",ds:["Fury"],e:2,m:2,kw:["Assault 2"],tx:"[Assault 2] (+2 M while I'm an attacker.)When you play me, discard 1."},
{n:"Cithria of Cloudfield",t:"Unit",d:"Body",ds:["Body"],e:2,m:1,kw:[],tx:"When you play another unit, buff me. (If I don't have a buff, I get a +1 M buff.)"},
{n:"Cleave",t:"Spell",d:"Fury",ds:["Fury"],e:1,m:null,kw:["Action", "Assault 3"],tx:"[Action] (Play on your turn or in showdowns.)Give a unit [Assault 3] this turn. (+3 M while it's an attacker.)"},
{n:"Combat Chef",t:"Unit",d:"Body",ds:["Body"],e:5,m:5,kw:[],tx:"[Weaponmaster] (When you play me, you may [Equip] one of your Equipment to me for Power less, even if it's already attached.)"},
{n:"Combat Experience",t:"Spell",d:"Calm",ds:["Calm"],e:1,m:null,kw:["Reaction"],tx:"[Reaction] (Play any time, even before spells and abilities resolve.)Give a unit +1 M this turn.[Level 6][ ] Give it +3 M this turn "},
{n:"Commander Ledros",t:"Unit",d:"Order",ds:["Order"],e:6,m:8,kw:["Deflect", "Ganking"],tx:"As you play me, you may kill any number of friendly units as an additional cost. Reduce my cost by Order for each killed this way.[Deflect] "},
{n:"Concentrate",t:"Spell",d:"Body",ds:["Body"],e:5,m:null,kw:[],tx:"Draw 2.[Level 6][ ] This costs 2 less. (While you have 6+ XP, get the effect.)[Level 11][ ] This costs 4 less instead."},
{n:"Confront",t:"Spell",d:"Body",ds:["Body"],e:2,m:null,kw:["Action"],tx:"[Action] (Play on your turn or in showdowns.)Units you play this turn enter ready. Draw 1."},
{n:"Conscription",t:"Spell",d:"Chaos",ds:["Chaos"],e:5,m:null,kw:[],tx:"You may spend 5 XP as an additional cost to play this.Choose an enemy unit at a battlefield with 3 M or less. If you paid the additional cost"},
{n:"Crescent Guardian",t:"Unit",d:"Chaos",ds:["Chaos"],e:4,m:4,kw:[],tx:"If you've played a spell this turn, you may pay Chaos as an additional cost to play me. If you do, I enter ready."},
{n:"Crimson Pigeons",t:"Unit",d:"Order",ds:["Order"],e:3,m:3,kw:[],tx:"I have +2 M while I'm attacking with another unit."},
{n:"Crowd Favorite",t:"Unit",d:"Body",ds:["Body"],e:3,m:3,kw:[],tx:"[Hunt] (When I conquer or hold, gain 1 XP.)Spend 2 XP [Buff] me. (Give me a +1 M buff if I don't have one.)"},
{n:"Cruel Patron",t:"Unit",d:"Order",ds:["Order"],e:4,m:6,kw:[],tx:"As an additional cost to play me, kill a friendly unit."},
{n:"Cull the Weak",t:"Spell",d:"Order",ds:["Order"],e:2,m:null,kw:[],tx:"Each player kills one of their units."},
{n:"Dancing Grenade",t:"Spell",d:"Fury",ds:["Fury"],e:2,m:null,kw:[],tx:"Deal 2 to a unit. Its controller may play this spell again for Power. If they do, this deals 1 additional Bonus Damage for each time this "},
{n:"Danger Zone",t:"Spell",d:"Fury",ds:["Fury", "Mind"],e:1,m:null,kw:["Reaction"],tx:"[Reaction] (Play any time, even before spells and abilities resolve.)[Repeat] 1Power (You may pay the additional cost to repea"},
{n:"Dangerous Duo",t:"Unit",d:"Fury",ds:["Fury"],e:3,m:3,kw:["Legion"],tx:"[Legion] — When you play me, give a unit +2 M this turn. (Get the effect if you've played another card this turn.)"},
{n:"Darius, Trifarian",t:"Unit",d:"Fury",ds:["Fury"],e:5,m:5,kw:[],tx:"When you play your second card in a turn, give me +2 M this turn and ready me."},
{n:"Dark Child - Starter",t:"Legend",d:"Fury",ds:["Fury", "Chaos"],e:null,m:null,kw:[],tx:"At the end of your turn, ready up to 2 runes."},
{n:"Daughter of the Void",t:"Legend",d:"Fury",ds:["Fury", "Mind"],e:null,m:null,kw:["Reaction"],tx:"[T] [Reaction] — [Add] Power. Use only to play spells. (Abilities that add resources can't be reacted to.)"},
{n:"Dauntless Vanguard",t:"Unit",d:"Body",ds:["Body"],e:4,m:4,kw:[],tx:"You may play me to an occupied enemy battlefield."},
{n:"Deadly Flourish",t:"Spell",d:"Mind",ds:["Mind"],e:4,m:null,kw:["Reaction"],tx:"Deal 3 to an enemy unit. When it dies this turn, play a Gold gear token exhausted. (It has  [Reaction][ ] Kill this, [T] [Add] rb_rune_rain"},
{n:"Deathgrip",t:"Spell",d:"Order",ds:["Order"],e:2,m:null,kw:["Reaction"],tx:"[Reaction] (Play any time, even before spells and abilities resolve.)Kill a friendly unit. If you do, give +M equal to its Might to another f"},
{n:"Decisive Strike",t:"Spell",d:"Body",ds:["Body", "Order"],e:5,m:null,kw:["Action"],tx:"[Action] (Play on your turn or in showdowns.)Give friendly units +2 M this turn."},
{n:"Desert's Call",t:"Spell",d:"Calm",ds:["Calm"],e:2,m:null,kw:[],tx:"[Repeat] 2 (You may pay the additional cost to repeat this spell's effect.)Play a 2 M Sand Soldier unit token."},
{n:"Determined Sentry",t:"Unit",d:"Body",ds:["Body"],e:1,m:1,kw:[],tx:"I can't move to base."},
{n:"Diana, Lunari",t:"Unit",d:"Mind",ds:["Mind"],e:3,m:3,kw:[],tx:"When a showdown begins here, you may pay 1. If you do, [Predict], then reveal the top card of your Main Deck. If it's a spell, draw it. (T"},
{n:"Diana, No Longer Human",t:"Unit",d:"Chaos",ds:["Chaos"],e:4,m:3,kw:[],tx:"[Ambush]When you play a spell, give me +2 M this turn."},
{n:"Disarming Rake",t:"Unit",d:"Calm",ds:["Calm"],e:3,m:2,kw:[],tx:"When you play me, you may kill a gear."},
{n:"Discipline",t:"Spell",d:"Calm",ds:["Calm"],e:2,m:null,kw:["Reaction"],tx:"[Reaction] (Play any time, even before spells and abilities resolve.)Give a unit +2 M this turn. Draw 1."},
{n:"Disintegrate",t:"Spell",d:"Fury",ds:["Fury"],e:4,m:null,kw:["Action"],tx:"[Action] (Play on your turn or in showdowns.)Deal 3 to a unit at a battlefield. If this kills it, do this draw 1."},
{n:"Disposal Order",t:"Spell",d:"Body",ds:["Body"],e:2,m:null,kw:["Reaction"],tx:"[Reaction] (Play any time, even before spells and abilities resolve.)Choose one —Choose up to 3 cards from opponents' trashes. Their owners recycle th"},
{n:"Divine Judgment",t:"Spell",d:"Order",ds:["Order"],e:7,m:null,kw:[],tx:"Each player chooses 2 units, 2 gear, 2 runes, and 2 cards in their hands. Recycle the rest."},
{n:"Double Trouble",t:"Spell",d:"Calm",ds:["Calm"],e:2,m:null,kw:[],tx:"[Repeat] 2 (You may pay the additional cost to repeat this spell's effect.)Look at the top 3 cards of your Main Deck. You may reveal a uni"},
{n:"Downstage Dramatics",t:"Spell",d:"Mind",ds:["Mind"],e:2,m:null,kw:["Reaction"],tx:"[Reaction] (Play any time, even before spells and abilities resolve.)[Repeat] 2 (You may pay the additional cost to repeat this spell's ef"},
{n:"Downwell",t:"Spell",d:"Chaos",ds:["Chaos"],e:8,m:null,kw:[],tx:"Return all units and gear to their owners' hands."},
{n:"Drag Under",t:"Spell",d:"Order",ds:["Order"],e:5,m:null,kw:["Action"],tx:"[Action] (Play on your turn or in showdowns.)I cost 2 less to play from anywhere other than your hand.Kill a unit at a battlefield."},
{n:"Dragon's Rage",t:"Spell",d:"Calm",ds:["Calm", "Body"],e:4,m:null,kw:[],tx:"Move an enemy unit. Then do this Choose another enemy unit at its destination. They deal damage equal to their Mights to each other."},
{n:"Dragonsoul Sage",t:"Unit",d:"Body",ds:["Body"],e:2,m:1,kw:["Reaction"],tx:"[Reaction][ ] [T] [Add] 1. (Abilities that add resources can't be reacted to.)"},
{n:"Draven, Showboat",t:"Unit",d:"Fury",ds:["Fury"],e:5,m:3,kw:[],tx:"My Might is increased by your points."},
{n:"Dune Drake",t:"Unit",d:"Body",ds:["Body"],e:5,m:5,kw:[],tx:"When I attack, give me +2 M this turn if there is a ready enemy unit here."},
{n:"Dunebreaker",t:"Unit",d:"Fury",ds:["Fury"],e:7,m:7,kw:[],tx:"If you have two or fewer cards in your hand, I enter ready.When I hold, draw 2."},
{n:"Dusk Rose Lab",t:"Battlefield",d:"Colorless",ds:["Colorless"],e:null,m:null,kw:[],tx:"At the start of your Beginning Phase, you may kill a unit you control here to draw 1. (This happens before scoring.)"},
{n:"Eager Apprentice",t:"Unit",d:"Mind",ds:["Mind"],e:3,m:3,kw:[],tx:"While I'm at a battlefield, the Energy costs for spells you play is reduced by 1, to a minimum of 1."},
{n:"Eager Drakehound",t:"Unit",d:"Fury",ds:["Fury"],e:3,m:3,kw:[],tx:"I enter ready."},
{n:"Eclipse",t:"Spell",d:"Mind",ds:["Mind"],e:3,m:null,kw:["Reaction"],tx:"[Reaction] (Play any time, even before spells and abilities resolve.)Give a unit -4 M this turn.[Predict]. (Look at the top card of your Main"},
{n:"Eclipse Herald",t:"Unit",d:"Calm",ds:["Calm"],e:7,m:7,kw:[],tx:"When you stun an enemy unit, ready me and give me +1 M this turn."},
{n:"Eminent Benefactor",t:"Unit",d:"Order",ds:["Order"],e:6,m:5,kw:[],tx:"When I hold, play two Gold gear tokens exhausted."},
{n:"Emperor's Divide",t:"Spell",d:"Calm",ds:["Calm"],e:2,m:null,kw:["Hidden", "Action"],tx:"[Hidden] (Hide now for Power to react with later for 0.)[Action] (Play on your turn or in showdowns.)Move any number of friend"},
{n:"Enthusiastic Promoter",t:"Unit",d:"Calm",ds:["Calm"],e:3,m:2,kw:[],tx:"[Backline] (I must be assigned combat damage last.)When I hold, [Buff] all units here. (Give each a +1 M buff if it doesn't have one.)"},
{n:"Evelynn, Entrancing",t:"Unit",d:"Chaos",ds:["Chaos"],e:2,m:2,kw:["Hidden"],tx:"[Hidden] (Hide now for Power to react with later for 0.)[Backline] (I must be assigned combat damage last.)When you play me fr"},
{n:"Evershade Stalker",t:"Unit",d:"Chaos",ds:["Chaos"],e:3,m:3,kw:[],tx:"When you play me, discard 1, then draw 1."},
{n:"Existential Dread",t:"Spell",d:"Chaos",ds:["Chaos"],e:1,m:null,kw:["Action"],tx:"[Action] (Play on your turn or in showdowns.)[Repeat] 2 (You may pay the additional cost to repeat this spell's effect.)[Stun] an attackin"},
{n:"Ezreal, Prodigy",t:"Unit",d:"Chaos",ds:["Chaos"],e:3,m:3,kw:[],tx:"When you play me, discard 1, then draw 2.Optional additional costs you pay cost 1 or Power less."},
{n:"Facebreaker",t:"Spell",d:"Order",ds:["Order"],e:2,m:null,kw:["Hidden", "Action"],tx:"[Hidden] (Hide now for Power to react with later for 0.)[Action] (Play on your turn or in showdowns.)Stun a friendly unit and "},
{n:"Fading Memories",t:"Spell",d:"Chaos",ds:["Chaos"],e:4,m:null,kw:["Temporary"],tx:"Give a unit at a battlefield or a gear [Temporary]. (Kill it at the start of its controller's Beginning Phase, before scoring.)"},
{n:"Faithful Manufactor",t:"Unit",d:"Order",ds:["Order"],e:3,m:2,kw:[],tx:"When you play me, play a 1 M Recruit unit token here."},
{n:"Falling Comet",t:"Spell",d:"Mind",ds:["Mind"],e:5,m:null,kw:["Action"],tx:"[Action] (Play on your turn or in showdowns.)Deal 6 to a unit at a battlefield."},
{n:"Falling Star",t:"Spell",d:"Fury",ds:["Fury"],e:2,m:null,kw:[],tx:"Deal 3 to a unit.Deal 3 to a unit."},
{n:"Fate Weaver",t:"Unit",d:"Mind",ds:["Mind"],e:5,m:4,kw:[],tx:"When you play me, look at the top 4 cards of your Main Deck. You may reveal a spell with Energy cost 4 or more from among them and draw it"},
{n:"Feral Strength",t:"Spell",d:"Calm",ds:["Calm"],e:2,m:null,kw:["Reaction"],tx:"[Reaction] (Play any time, even before spells and abilities resolve.)[Repeat] 2 (You may pay the additional cost to repeat this spell's ef"},
{n:"Fight or Flight",t:"Spell",d:"Chaos",ds:["Chaos"],e:2,m:null,kw:["Hidden", "Action"],tx:"[Hidden] (Hide now for Power to react with later for 0.)[Action] (Play on your turn or in showdowns.)Move a unit from a battle"},
{n:"Final Spark",t:"Spell",d:"Mind",ds:["Mind", "Order"],e:8,m:null,kw:["Action"],tx:"[Action] (Play on your turn or in showdowns.)Deal 8 to a unit."},
{n:"Find Your Center",t:"Spell",d:"Calm",ds:["Calm"],e:3,m:null,kw:["Action"],tx:"[Action] (Play on your turn or in showdowns.)If an opponent's score is within 3 points of the Victory Score, this costs 2 less.Draw 1 and "},
{n:"Fiora, Peerless",t:"Unit",d:"Body",ds:["Body"],e:3,m:3,kw:[],tx:"When I attack or defend one on one, double my Might this combat."},
{n:"Fiora, Worthy",t:"Unit",d:"Order",ds:["Order"],e:3,m:3,kw:[],tx:"When a unit you control becomes [Mighty], you may pay Order to ready it. (A unit is Mighty while it has 5+ M.)"},
{n:"Firestorm",t:"Spell",d:"Fury",ds:["Fury"],e:6,m:null,kw:[],tx:"Deal 3 to all enemy units at a battlefield."},
{n:"First Mate",t:"Unit",d:"Body",ds:["Body"],e:3,m:3,kw:[],tx:"When you play me, ready another unit."},
{n:"Fizz, Trickster",t:"Unit",d:"Chaos",ds:["Chaos"],e:3,m:3,kw:[],tx:"When you play me, you may play a spell from your trash with Energy cost no more than 3, ignoring its Energy cost. Recycle that spell after"},
{n:"Flame Chompers",t:"Unit",d:"Fury",ds:["Fury"],e:3,m:3,kw:[],tx:"When you discard me, you may pay Fury to play me."},
{n:"Flash",t:"Spell",d:"Chaos",ds:["Chaos"],e:2,m:null,kw:["Reaction"],tx:"[Reaction] (Play any time, even before spells and abilities resolve.)Move up to 2 friendly units to base."},
{n:"Flurry of Feathers",t:"Spell",d:"Calm",ds:["Calm"],e:4,m:null,kw:["Reaction", "Deflect"],tx:"[Reaction]Choose one —Counter a spell.Play four 1 M Bird unit tokens with [Deflect]. (Opponents must pay Power to choose them wit"},
{n:"Forecaster",t:"Unit",d:"Mind",ds:["Mind"],e:2,m:2,kw:[],tx:"Your Mechs have [Vision]. (When you play us, look at the top card of your Main Deck. You may recycle it.)"},
{n:"Forge of the Fluft",t:"Battlefield",d:"Colorless",ds:["Colorless"],e:null,m:null,kw:[],tx:"While you control this battlefield, friendly legends have  [T] Attach an Equipment you control to a unit you control."},
{n:"Forgotten Monument",t:"Battlefield",d:"Colorless",ds:["Colorless"],e:null,m:null,kw:[],tx:"Players can't score here until their third turn."},
{n:"Fortified Position",t:"Battlefield",d:"Colorless",ds:["Colorless"],e:null,m:null,kw:["Shield 2"],tx:"When you defend here, choose a unit. It gains [Shield 2] this combat. (+2 M while it's a defender.)"},
{n:"Fox-Fire",t:"Spell",d:"Calm",ds:["Calm", "Mind"],e:3,m:null,kw:["Hidden", "Action"],tx:"[Hidden] (Hide now for Power to react with later for 0.)[Action] (Play on your turn or in showdowns.)Kill any number of units "},
{n:"Frigid Touch",t:"Spell",d:"Mind",ds:["Mind"],e:2,m:null,kw:["Reaction"],tx:"[Reaction] (Play any time, even before spells and abilities resolve.)[Repeat] 2 (You may pay the additional cost to repeat this spell's ef"},
{n:"Garen, Commander",t:"Unit",d:"Order",ds:["Order"],e:6,m:5,kw:[],tx:"Other friendly units have +1 M here."},
{n:"Gearhead",t:"Unit",d:"Mind",ds:["Mind"],e:5,m:3,kw:["Accelerate"],tx:"[Accelerate] (You may pay 1Mind as an additional cost to have me enter ready.)Each Equipment attached to me gives double its bas"},
{n:"Gem Jammer",t:"Unit",d:"Fury",ds:["Fury"],e:2,m:2,kw:["Ganking"],tx:"When you play me, give a unit [Ganking] this turn. (It can move from battlefield to battlefield.)"},
{n:"Gemhand Hunter",t:"Unit",d:"Body",ds:["Body"],e:2,m:2,kw:[],tx:"[Hunt] (When I conquer or hold, gain 1 XP.)[Level 6][ ] I have +1 M. (While you have 6+ XP, get the effect.)"},
{n:"Gentle Gemdragon",t:"Unit",d:"Body",ds:["Body"],e:8,m:8,kw:[],tx:"When you play me or another Dragon, ready up to 2 runes."},
{n:"Get Excited!",t:"Spell",d:"Fury",ds:["Fury"],e:2,m:null,kw:["Action"],tx:"[Action] (Play on your turn or in showdowns.)Discard 1. Deal its Energy cost as damage to a unit at a battlefield. (Ignore its Power cost.)"},
{n:"Glasc Mixologist",t:"Unit",d:"Order",ds:["Order"],e:5,m:5,kw:["Deathknell"],tx:"[Deathknell] — You may play a unit with cost no more than 3 and no more than Power from your trash, ignoring its cost. (When I"},
{n:"Gloomist",t:"Legend",d:"Calm",ds:["Calm", "Chaos"],e:null,m:null,kw:[],tx:"When you or an ally hold, you may exhaust me to draw 1."},
{n:"Grand Duelist",t:"Legend",d:"Body",ds:["Body", "Order"],e:null,m:null,kw:[],tx:"When one of your units becomes [Mighty], you may exhaust me to channel 1 rune exhausted. (A unit is Mighty while it has 5+ M.)"},
{n:"Grim Apothecary",t:"Unit",d:"Fury",ds:["Fury"],e:3,m:3,kw:["Reaction"],tx:"[Ambush] (You may play me as a [Reaction] to a battlefield where you have units.)When you play me, you may return a friendly unit at a battlefield to "},
{n:"Grim Resolve",t:"Spell",d:"Body",ds:["Body"],e:2,m:null,kw:["Action"],tx:"[Action] (Play on your turn or in showdowns.)Give a friendly unit +3 M this turn. When it wins a combat this turn, gain 2 XP."},
{n:"Grove of the God-Willow",t:"Battlefield",d:"Colorless",ds:["Colorless"],e:null,m:null,kw:[],tx:"When you hold here, draw 1."},
{n:"Guards!",t:"Spell",d:"Order",ds:["Order"],e:3,m:null,kw:["Hidden"],tx:"[Hidden] (Hide now for Power to react with later for 0.)Play a 2 M Sand Soldier unit token. You may pay rb_rune_orde"},
{n:"Gust",t:"Spell",d:"Chaos",ds:["Chaos"],e:1,m:null,kw:["Reaction"],tx:"[Reaction] (Play any time, even before spells and abilities resolve.)Return a unit at a battlefield with 3 M or less to its owner's hand."},
{n:"Gustwalker",t:"Unit",d:"Mind",ds:["Mind"],e:3,m:3,kw:["Ganking", "Ganking"],tx:"[Hunt 2] (When I conquer or hold, gain 2 XP.)[Level 3][ ] I have +1 M and [Ganking]. (While you have 3+ XP, get the effect. A [Ganking] unit "},
{n:"Hall of Legends",t:"Battlefield",d:"Colorless",ds:["Colorless"],e:null,m:null,kw:[],tx:"When you conquer here, you may pay 1 to ready your legend."},
{n:"Hand of Noxus",t:"Legend",d:"Fury",ds:["Fury", "Order"],e:null,m:null,kw:["Reaction", "Legion"],tx:"[T] [Reaction], [Legion] — [Add] 1. (Abilities that add resources can't be reacted to. Get the effect if you've played a card th"},
{n:"Harnessed Dragon",t:"Unit",d:"Order",ds:["Order"],e:8,m:6,kw:[],tx:"When you play me, kill an enemy unit."},
{n:"Heedless Resurrection",t:"Spell",d:"Chaos",ds:["Chaos"],e:2,m:null,kw:["Reaction"],tx:"[Reaction] (Play any time, even before spells and abilities resolve.)As an additional cost to play this, kill a friendly unit.Play a unit from your tr"},
{n:"Herald of Scales",t:"Unit",d:"Body",ds:["Body"],e:4,m:3,kw:[],tx:"Your Dragons' Energy costs are reduced by 2, to a minimum of 1."},
{n:"Herald of the Arcane",t:"Legend",d:"Mind",ds:["Mind", "Order"],e:null,m:null,kw:[],tx:"1, [T] Play a 1 M Recruit unit token."},
{n:"Heroic Charge",t:"Spell",d:"Order",ds:["Order"],e:3,m:null,kw:["Action"],tx:"[Action] (Play on your turn or in showdowns.)Give a friendly unit +1 M this turn and [Stun] an enemy unit at its location. (A stunned unit do"},
{n:"Hextech Ray",t:"Spell",d:"Fury",ds:["Fury"],e:1,m:null,kw:["Action"],tx:"[Action] (Play on your turn or in showdowns.)Deal 3 to a unit at a battlefield."},
{n:"Hidden Blade",t:"Spell",d:"Order",ds:["Order"],e:2,m:null,kw:["Hidden", "Action"],tx:"[Hidden] (Hide now for Power to react with later for 0.)[Action] (Play on your turn or in showdowns.)Kill a unit at a battlefi"},
{n:"Highlander",t:"Spell",d:"Calm",ds:["Calm", "Body"],e:4,m:null,kw:["Reaction"],tx:"[Reaction] (Play any time, even before spells and abilities resolve.)Choose a friendly unit. The next time it would die this turn, heal it, exhaust it"},
{n:"Honest Broker",t:"Unit",d:"Order",ds:["Order"],e:2,m:2,kw:["Deathknell"],tx:"[Deathknell] — Play a Gold gear token exhausted. (When I die, get the effect.)"},
{n:"Hostile Takeover",t:"Spell",d:"Mind",ds:["Mind", "Order"],e:5,m:null,kw:["Hidden"],tx:"[Hidden] (Hide now for Power to react with later for 0.)Take control of an enemy unit at a battlefield. Ready it. (Start a com"},
{n:"Hwei, Brooding Painter",t:"Unit",d:"Mind",ds:["Mind"],e:5,m:5,kw:[],tx:"When I move, draw 1, then discard 1. Then, do the following based on the discarded card's typeSpell — Draw 1.Gear — Ready up to 2 runes.Unit — Give m"},
{n:"Iascylla",t:"Unit",d:"Calm",ds:["Calm"],e:7,m:6,kw:[],tx:"When I hold, at the start of your next Main Phase, you may move an enemy unit to this battlefield."},
{n:"Icathian Rain",t:"Spell",d:"Fury",ds:["Fury", "Mind"],e:7,m:null,kw:[],tx:"Deal 2 to a unit.Deal 2 to a unit.Deal 2 to a unit.Deal 2 to a unit.Deal 2 to a unit.Deal 2 to a unit."},
{n:"Icevale Archer",t:"Unit",d:"Mind",ds:["Mind"],e:2,m:2,kw:[],tx:"When I attack, you may pay 1 to give a unit here -1 M this turn."},
{n:"Immortal Phoenix",t:"Unit",d:"Fury",ds:["Fury"],e:3,m:3,kw:["Assault 2"],tx:"[Assault 2] (+2 M while I'm an attacker.)When you kill a unit with a spell, you may pay 1Fury to play me from your tras"},
{n:"Imperial Decree",t:"Spell",d:"Order",ds:["Order"],e:5,m:null,kw:["Action"],tx:"[Action] (Play on your turn or in showdowns.)When any unit takes damage this turn, kill it."},
{n:"Imposing Challenger",t:"Unit",d:"Body",ds:["Body"],e:5,m:5,kw:[],tx:"When I move, you may move an enemy unit here with less Might than me to a different battlefield."},
{n:"Incinerate",t:"Spell",d:"Fury",ds:["Fury"],e:2,m:null,kw:["Action"],tx:"[Action] (Play on your turn or in showdowns.)Deal 2 to a unit at a battlefield."},
{n:"Inferna",t:"Unit",d:"Fury",ds:["Fury"],e:2,m:1,kw:["Reaction", "Assault 2"],tx:"[Ambush] (You may play me as a [Reaction] to a battlefield where you have units.)[Assault 2] (+2 M while I'm an attacker.)"},
{n:"Insightful Investigator",t:"Unit",d:"Chaos",ds:["Chaos"],e:3,m:3,kw:[],tx:"When you play me, choose an opponent. They reveal their hand. You may pay 2 XP to choose a card from their hand. If you do, they discard that card and"},
{n:"Invert Timelines",t:"Spell",d:"Chaos",ds:["Chaos"],e:3,m:null,kw:[],tx:"Each player discards their hand, then draws 4."},
{n:"Inviolus Vox",t:"Unit",d:"Fury",ds:["Fury"],e:8,m:8,kw:[],tx:"When I conquer, give a friendly unit +8 M this turn."},
{n:"Irelia, Fervent",t:"Unit",d:"Calm",ds:["Calm"],e:5,m:4,kw:["Deflect"],tx:"[Deflect] (Opponents must pay Power to choose me with a spell or ability.)When you choose or ready me, give me +1 M this turn."},
{n:"Isolate",t:"Spell",d:"Chaos",ds:["Chaos"],e:2,m:null,kw:[],tx:"Move an enemy unit from a battlefield to its base. Then, if there's an enemy unit alone at that battlefield, draw 1."},
{n:"Ivern, Friend to All",t:"Unit",d:"Order",ds:["Order"],e:6,m:6,kw:[],tx:"As you play me, choose Bird, Cat, Dog, or Poro. I gain that tag.When I conquer or hold, score 1 point if your units have all of the following tags amo"},
{n:"Jae Medarda",t:"Unit",d:"Chaos",ds:["Chaos"],e:5,m:5,kw:[],tx:"When you choose me with a spell, draw 1."},
{n:"Jaull-Fish",t:"Unit",d:"Body",ds:["Body"],e:7,m:6,kw:["Accelerate"],tx:"[Accelerate] (You may pay 1Body as an additional cost to have me enter ready.)I cost 2 less for each of your [Mighty"},
{n:"Jax, Unrelenting",t:"Unit",d:"Body",ds:["Body"],e:4,m:3,kw:[],tx:"[Weaponmaster] (When you play me, you may [Equip] one of your Equipment to me for Power less, even if it's already attached.)When you atta"},
{n:"Jayce, Man of Progress",t:"Unit",d:"Mind",ds:["Mind"],e:4,m:4,kw:[],tx:"When you play me, you may kill a friendly gear. If you do, you may play a gear with Energy cost no more than 7 from hand this turn, ignori"},
{n:"Jeweled Colossus",t:"Unit",d:"Mind",ds:["Mind"],e:5,m:5,kw:[],tx:"[Vision] (When you play me, look at the top card of your Main Deck. You may recycle it.)[Shield] (+1 M while I'm a defender.)"},
{n:"Jhin, Meticulous Killer",t:"Unit",d:"Mind",ds:["Mind"],e:4,m:4,kw:[],tx:"[Vision] (When you play me, look at the top card of your Main Deck. You may recycle it.)If you've spent 4 or more to play a spell this tur"},
{n:"Jhin, Murderous Artist",t:"Unit",d:"Fury",ds:["Fury"],e:4,m:4,kw:["Deflect", "Ganking"],tx:"[Deflect][Ganking]When I move, [Add] 1Power."},
{n:"Jinx, Demolitionist",t:"Unit",d:"Fury",ds:["Fury"],e:3,m:4,kw:["Accelerate", "Assault 2"],tx:"[Accelerate] (You may pay 1Fury as an additional cost to have me enter ready.)[Assault 2] (+2 M while I'm an attacker.)"},
{n:"Kadregrin the Infernal",t:"Unit",d:"Fury",ds:["Fury"],e:9,m:9,kw:[],tx:"When you play me, draw 1 for each of your [Mighty] units. (A unit is Mighty while it has 5+ M.)"},
{n:"Kai'Sa, Evolutionary",t:"Unit",d:"Mind",ds:["Mind"],e:6,m:6,kw:["Ganking"],tx:"[Ganking] (I can move from battlefield to battlefield.)When I conquer, you may play a spell from your trash with Energy cost less than your points wit"},
{n:"Kai'Sa, Survivor",t:"Unit",d:"Fury",ds:["Fury"],e:4,m:4,kw:["Accelerate"],tx:"[Accelerate] (You may pay 1Fury as an additional cost to have me enter ready.)When I conquer, draw 1."},
{n:"Karthus, Eternal",t:"Unit",d:"Order",ds:["Order"],e:3,m:3,kw:["Deathknell"],tx:"Your [Deathknell] effects trigger an additional time."},
{n:"Katarina, Reckless",t:"Unit",d:"Fury",ds:["Fury"],e:5,m:5,kw:[],tx:"When you hide a card, ready me.When you play a card from face down, deal 2 to an enemy unit."},
{n:"Kato the Arm",t:"Unit",d:"Body",ds:["Body"],e:4,m:3,kw:["Deflect"],tx:"[Deflect] (Opponents must pay Power to choose me with a spell or ability.)When I move to a battlefield, give another friendly unit my keyw"},
{n:"Keeper of Masks",t:"Unit",d:"Mind",ds:["Mind"],e:2,m:1,kw:["Hidden", "Temporary"],tx:"[Hidden] (Hide now for Power to react with later for 0.)[Temporary] (Kill me at the start of my controller's Beginning Phase, "},
{n:"Keeper's Verdict",t:"Spell",d:"Body",ds:["Body", "Order"],e:2,m:null,kw:["Action"],tx:"[Action] (Play on your turn or in showdowns.)Choose an enemy unit at a battlefield. Its owner places it on the top or bottom of their Main Deck."},
{n:"Kha'Zix, Mutating Horror",t:"Unit",d:"Chaos",ds:["Chaos"],e:4,m:4,kw:["Reaction"],tx:"[Ambush] (You may play me as a [Reaction] to a battlefield where you have units.)When I attack or defend, if an enemy unit is alone here, give me +2 "},
{n:"King's Edict",t:"Spell",d:"Order",ds:["Order"],e:6,m:null,kw:[],tx:"Starting with the next player, each other player chooses a unit you don't control that hasn't been chosen for this spell. Kill those units."},
{n:"Kinkou Initiate",t:"Unit",d:"Body",ds:["Body"],e:3,m:3,kw:[],tx:"When you play me, draw 1 if your other units have total Might 5 or more."},
{n:"Kinkou Monk",t:"Unit",d:"Body",ds:["Body"],e:4,m:4,kw:[],tx:"When you play me, buff up to two other friendly units. (Each one that doesn't have a buff gets a +1 M buff.)"},
{n:"Kog'Maw, Caustic",t:"Unit",d:"Chaos",ds:["Chaos"],e:3,m:1,kw:["Deathknell"],tx:"[Deathknell] — Deal 4 to all units at my battlefield. (When I die, get the effect.)"},
{n:"Kraken Hunter",t:"Unit",d:"Body",ds:["Body"],e:3,m:5,kw:["Accelerate"],tx:"[Accelerate] (You may pay 1Body as an additional cost to have me enter ready.)[Assault] (+1 M while I'm an attacker.)As"},
{n:"Lady of Luminosity - Starter",t:"Legend",d:"Mind",ds:["Mind", "Order"],e:null,m:null,kw:[],tx:"When you play a spell that costs 5 or more, draw 1."},
{n:"Laurent Bladekeeper",t:"Unit",d:"Body",ds:["Body"],e:3,m:3,kw:[],tx:"Ganking (I can move from battlefield to battlefield.)"},
{n:"Laurent Duelist",t:"Unit",d:"Order",ds:["Order"],e:4,m:3,kw:["Assault 2"],tx:"[Assault 2] (+2 M while I'm an attacker.)"},
{n:"LeBlanc, Fragmented",t:"Unit",d:"Order",ds:["Order"],e:3,m:3,kw:["Deathknell"],tx:"[Assault] (+1 M while I'm an attacker.)[Deathknell][ ] Draw 1. If it's your Beginning Phase, draw 2 instead. (When I die, get the effect.)"},
{n:"Lee Sin, Centered",t:"Unit",d:"Body",ds:["Body"],e:6,m:6,kw:["Accelerate"],tx:"[Accelerate] (You may pay 1Body as an additional cost to have me enter ready.)Other buffed friendly units at my battlefield have"},
{n:"Legion Quartermaster",t:"Unit",d:"Calm",ds:["Calm"],e:3,m:4,kw:[],tx:"As an additional cost to play me, return a friendly gear to its owner's hand."},
{n:"Legion Rearguard",t:"Unit",d:"Fury",ds:["Fury"],e:2,m:2,kw:["Accelerate"],tx:"[Accelerate] (You may pay 1Fury as an additional cost to have me enter ready.)"},
{n:"Leona, Zealot",t:"Unit",d:"Calm",ds:["Calm"],e:6,m:6,kw:[],tx:"If an opponent's score is within 3 points of the Victory Score, I enter ready.Stunned enemy units here have -8 M, to a minimum of 1 rb_might"},
{n:"Lillia, Fae Fawn",t:"Unit",d:"Mind",ds:["Mind"],e:3,m:3,kw:["Accelerate", "Temporary"],tx:"[Accelerate]When I move from a location, play a 3 M Sprite unit token with [Temporary] there."},
{n:"Lillia, Protector of Dreams",t:"Unit",d:"Calm",ds:["Calm"],e:5,m:4,kw:["Tank"],tx:"When you play a token unit, give me +1 M this turn.Your token units have [Tank]."},
{n:"Lilting Lullaby",t:"Spell",d:"Calm",ds:["Calm", "Mind"],e:2,m:null,kw:["Reaction"],tx:"[Reaction] (Play any time, even before spells and abilities resolve.)Counter a spell. Its controller can't play spells this turn."},
{n:"Lonely Poro",t:"Unit",d:"Calm",ds:["Calm"],e:2,m:2,kw:["Deathknell"],tx:"[Deathknell] — If I died alone, draw 1. (When I die, get the effect. I'm alone if there are no other friendly units here.)"},
{n:"Loose Cannon",t:"Legend",d:"Fury",ds:["Fury", "Chaos"],e:null,m:null,kw:[],tx:"At start of your Beginning Phase, draw 1 if you have one or fewer cards in your hand."},
{n:"Lord Broadmane",t:"Unit",d:"Fury",ds:["Fury"],e:5,m:5,kw:["Reaction"],tx:"[Ambush] (You may play me as a [Reaction] to a battlefield where you have units.)When you play me, give your other units here [Assault] this turn. (+1"},
{n:"Lotus Trap",t:"Spell",d:"Fury",ds:["Fury"],e:2,m:null,kw:["Hidden", "Reaction"],tx:"[Hidden] (Hide now for Power to react with later for 0.)[Reaction] (Play any time, even before spells and abilities resolve.)C"},
{n:"Loyal Poro",t:"Unit",d:"Order",ds:["Order"],e:3,m:3,kw:["Deathknell"],tx:"[Deathknell][ ] If I didn't die alone, draw 1. (When I die, get the effect. I wasn't alone if there were other friendly units here.)"},
{n:"Loyal Pup",t:"Unit",d:"Chaos",ds:["Chaos"],e:3,m:3,kw:[],tx:"When you defend at a battlefield, you may move me there."},
{n:"Lucian, Merciless",t:"Unit",d:"Body",ds:["Body"],e:3,m:3,kw:[],tx:"[Weaponmaster] (When you play me, you may [Equip] one of your Equipment to me for Power less, even if it's already attached.)The first tim"},
{n:"Lunar Boon",t:"Spell",d:"Chaos",ds:["Chaos"],e:3,m:null,kw:["Reaction"],tx:"[Reaction] (Play any time, even before spells and abilities resolve.)Discard 1, then draw 2."},
{n:"Lux, Crownguard",t:"Unit",d:"Order",ds:["Order"],e:4,m:2,kw:["Reaction"],tx:"[T] [Reaction] — [Add] 2. Use only to play spells. (Abilities that add resources can't be reacted to.)"},
{n:"Machine Evangel",t:"Unit",d:"Order",ds:["Order"],e:5,m:4,kw:["Deathknell"],tx:"[Deathknell] — Play three 1 M Recruit unit tokens into your base. (When I die, get the effect.)"},
{n:"Maddened Marauder",t:"Unit",d:"Chaos",ds:["Chaos"],e:5,m:4,kw:["Tank"],tx:"[Tank] (I must be assigned combat damage first.)When you play me, move a unit from a battlefield to its base."},
{n:"Maduli the Gatekeeper",t:"Unit",d:"Chaos",ds:["Chaos"],e:7,m:6,kw:[],tx:"I can't be readied.Chaos Move me to an occupied enemy battlefield if my Might is greater than the total Might of enemy units there."},
{n:"Mageseeker Warden",t:"Unit",d:"Calm",ds:["Calm"],e:6,m:5,kw:[],tx:"While I'm at a battlefield, opponents can only play units to their base.While I'm at a battlefield, spells and abilities can't ready enemy units and g"},
{n:"Magma Wurm",t:"Unit",d:"Fury",ds:["Fury"],e:8,m:8,kw:[],tx:"Other friendly units enter ready."},
{n:"Malzahar, Fanatic",t:"Unit",d:"Mind",ds:["Mind"],e:4,m:3,kw:["Action"],tx:"Kill a friendly unit or gear, [T] [Action] — [Add] PowerPower. (Use on your turn or in showdowns. Abilities that add"},
{n:"Marai Spire",t:"Battlefield",d:"Colorless",ds:["Colorless"],e:null,m:null,kw:[],tx:"While you control this battlefield, friendly [Repeat] costs cost 1 less."},
{n:"Marching Orders",t:"Spell",d:"Body",ds:["Body"],e:3,m:null,kw:["Action"],tx:"[Action] (Play on your turn or in showdowns.)[Repeat] 3 (You may pay the additional cost to repeat this spell's effect.)Choose a friendly "},
{n:"Master Yi, Tempered",t:"Unit",d:"Body",ds:["Body"],e:4,m:4,kw:["Deflect", "Ganking"],tx:"[Hunt 2] (When I conquer or hold, gain 2 XP.)[Level 6][ ] I have [Deflect] and [Ganking]. (While you have 6+ XP, opponents must pay Power "},
{n:"Mechanized Menace",t:"Legend",d:"Fury",ds:["Fury", "Mind"],e:null,m:null,kw:[],tx:"Your Mechs have [Shield]. (+1 M while they're defenders.)"},
{n:"Meditation",t:"Spell",d:"Calm",ds:["Calm"],e:2,m:null,kw:["Reaction"],tx:"[Reaction] (Play any time, even before spells and abilities resolve.)As an additional cost to play this, you may exhaust a friendly unit. If you do, d"},
{n:"Mega-Mech",t:"Unit",d:"Mind",ds:["Mind"],e:7,m:8,kw:[],tx:""},
{n:"Megatusk",t:"Unit",d:"Chaos",ds:["Chaos"],e:6,m:6,kw:["Ganking"],tx:"Spend 3 XP Give your units here [Ganking] this turn. (We can move from battlefield to battlefield.)"},
{n:"Might of Demacia - Starter",t:"Legend",d:"Body",ds:["Body", "Order"],e:null,m:null,kw:[],tx:"When you conquer, if you have 4+ units at that battlefield, draw 2."},
{n:"Minefield",t:"Battlefield",d:"Colorless",ds:["Colorless"],e:null,m:null,kw:[],tx:"When you conquer here, put the top 2 cards of your Main Deck into your trash."},
{n:"Minotaur Reckoner",t:"Unit",d:"Fury",ds:["Fury"],e:5,m:5,kw:[],tx:"Units can't move to base."},
{n:"Miss Fortune, Captain",t:"Unit",d:"Body",ds:["Body"],e:5,m:5,kw:["Accelerate", "Ganking"],tx:"[Accelerate] (You may pay 1Body as an additional cost to have me enter ready.)[Ganking] (I can move from battlefield to battlefi"},
{n:"Mister Root",t:"Unit",d:"Chaos",ds:["Chaos"],e:2,m:1,kw:["Accelerate"],tx:"[Accelerate] (You may pay 1Chaos as an additional cost to have me enter ready.)When I move to a battlefield, gain 2 XP."},
{n:"Mobilize",t:"Spell",d:"Body",ds:["Body"],e:2,m:null,kw:[],tx:"Channel 1 rune exhausted. If you can't, draw 1."},
{n:"Monch",t:"Unit",d:"Calm",ds:["Calm"],e:6,m:6,kw:[],tx:"If an opponent controls a stunned unit, I cost 2 less and enter ready."},
{n:"Monster Harpoon",t:"Spell",d:"Fury",ds:["Fury"],e:1,m:null,kw:["Action"],tx:"[Action] (Play on your turn or in showdowns.)Deal 2 to a unit at a battlefield. If you control a facedown card, deal 4 to it instead."},
{n:"Morbid Return",t:"Spell",d:"Chaos",ds:["Chaos"],e:2,m:null,kw:["Action"],tx:"[Action] (Play on your turn or in showdowns.)Return a unit from your trash to your hand."},
{n:"Mosstomper",t:"Unit",d:"Calm",ds:["Calm"],e:3,m:3,kw:["Deflect", "Deflect"],tx:"[Hunt 2] (When I conquer or hold, gain 2 XP.)[Level 3][ ] I have +1 M and [Deflect]. (While you have 3+ XP, get the effect. Opponents must pa"},
{n:"Mountain Drake",t:"Unit",d:"Body",ds:["Body"],e:9,m:10,kw:[],tx:""},
{n:"Mystic Reversal",t:"Spell",d:"Calm",ds:["Calm"],e:4,m:null,kw:["Reaction"],tx:"[Reaction] (Play any time, even before spells and abilities resolve.)Gain control of a spell. You may make new choices for it."},
{n:"Nami, Headstrong",t:"Unit",d:"Calm",ds:["Calm"],e:3,m:3,kw:[],tx:"You may pay Calm as an additional cost to play me.When you play me, if you paid the additional cost, [Stun] an enemy unit. (It doesn't deal "},
{n:"Navori Fighting Pit",t:"Battlefield",d:"Colorless",ds:["Colorless"],e:null,m:null,kw:[],tx:"When you hold here, buff a unit here. (If it doesn't have a buff, it gets a +1 M buff.)"},
{n:"Needlessly Large Yordle",t:"Unit",d:"Calm",ds:["Calm"],e:10,m:5,kw:["Shield 5", "Tank"],tx:"[Shield 5] (+5 M while I'm a defender.)[Tank] (I must be assigned combat damage first.)I cost 2Calm less for each point"},
{n:"Nidalee, Cat Form",t:"Unit",d:"Body",ds:["Body"],e:3,m:4,kw:["Reaction"],tx:"[Ambush] (You may play me as a [Reaction] to a battlefield where you have units.)When I win a combat, draw 1. (I win if I remain after combat.)"},
{n:"Nilah, Joyful Ascetic",t:"Unit",d:"Body",ds:["Body"],e:3,m:4,kw:["Accelerate", "Ganking"],tx:"[Accelerate] (You may pay 1Body as an additional cost to have me enter ready.)[Ganking] (I can move from battlefield to battlefi"},
{n:"Nocturne, Horrifying",t:"Unit",d:"Chaos",ds:["Chaos"],e:4,m:4,kw:["Ganking"],tx:"[Ganking] (I can move from battlefield to battlefield.)As you look at or reveal me from the top of your deck, you may banish me. If you do, you may pl"},
{n:"Noxian Drummer",t:"Unit",d:"Order",ds:["Order"],e:3,m:3,kw:[],tx:"When I move to a battlefield, play a 1 M Recruit unit token here. (It is also at the battlefield.)"},
{n:"Noxian Guillotine",t:"Spell",d:"Fury",ds:["Fury", "Order"],e:4,m:null,kw:["Action", "Legion"],tx:"[Action] (Play on your turn or in showdowns.)Choose a unit. Kill it the next time it takes damage this turn.[Legion] — Kill it now instead. (Get the e"},
{n:"Noxus Hopeful",t:"Unit",d:"Fury",ds:["Fury"],e:4,m:4,kw:["Legion"],tx:"[Legion] — I cost 2 less. (Get the effect if you've played another card this turn.)"},
{n:"Noxus Saboteur",t:"Unit",d:"Fury",ds:["Fury"],e:3,m:3,kw:["Hidden"],tx:"Your opponents' [Hidden] cards can't be revealed here."},
{n:"On the Hunt",t:"Spell",d:"Body",ds:["Body", "Chaos"],e:1,m:null,kw:[],tx:"Ready your units."},
{n:"Ornn, Blacksmith",t:"Unit",d:"Calm",ds:["Calm"],e:5,m:5,kw:[],tx:"When you play me or when I hold, look at the top 4 cards of your Main Deck. You may reveal a gear from among them and draw it. Then recycle the rest."},
{n:"Overt Operation",t:"Spell",d:"Body",ds:["Body"],e:5,m:null,kw:["Action"],tx:"[Action] (Play on your turn or in showdowns.)For each friendly unit, you may spend its buff to ready it. Then buff all friendly units. (Each one that "},
{n:"Overzealous Fan",t:"Unit",d:"Chaos",ds:["Chaos"],e:2,m:2,kw:[],tx:"When I defend, you may kill me to move an attacking unit to its base."},
{n:"Pakaa Cub",t:"Unit",d:"Body",ds:["Body"],e:3,m:3,kw:["Hidden"],tx:"[Hidden] (Hide now for Power to react with later for 0.)"},
{n:"Party Favors",t:"Spell",d:"Calm",ds:["Calm"],e:3,m:null,kw:[],tx:"Each other player chooses Cards or Runes. For each player that chooses Cards, you and that player each draw 1. For each player that chooses Runes, you"},
{n:"Peak Guardian",t:"Unit",d:"Order",ds:["Order"],e:6,m:5,kw:[],tx:"When you play me, buff me. Then, if I am at a battlefield, buff all other friendly units there. (To buff a unit, give it a +1 M buff if it do"},
{n:"Perched Grimwyrm",t:"Unit",d:"Fury",ds:["Fury"],e:4,m:5,kw:[],tx:"Play me only to a battlefield you conquered this turn. (You can't play me anywhere else.)"},
{n:"Petty Officer",t:"Unit",d:"Order",ds:["Order"],e:5,m:5,kw:[],tx:"[Assault] (+1 M while I'm an attacker.)"},
{n:"Pickpocket",t:"Unit",d:"Mind",ds:["Mind"],e:3,m:3,kw:[],tx:"When you play me, you may kill a gear with Energy cost no more than 1. If you do, play a Gold gear token exhausted."},
{n:"Piercing Light",t:"Spell",d:"Fury",ds:["Fury"],e:2,m:null,kw:[],tx:"[Repeat] 2Fury (You may pay the additional cost to repeat this spell's effect.)Deal 2 to a unit at a battlefield, then deal 2 to"},
{n:"Piltover Enforcer",t:"Legend",d:"Fury",ds:["Fury", "Order"],e:null,m:null,kw:[],tx:"When you conquer, if you assigned 3 or more excess damage, you may exhaust me to ready a unit."},
{n:"Pit Crew",t:"Unit",d:"Mind",ds:["Mind"],e:3,m:3,kw:[],tx:"When you play a gear, ready me."},
{n:"Pit Rookie",t:"Unit",d:"Body",ds:["Body"],e:2,m:2,kw:[],tx:"When you play me, buff another friendly unit. (If it doesn't have a buff, it gets a +1 M buff.)"},
{n:"Playful Phantom",t:"Unit",d:"Calm",ds:["Calm"],e:5,m:5,kw:[],tx:""},
{n:"Plundering Poro",t:"Unit",d:"Mind",ds:["Mind"],e:2,m:2,kw:[],tx:"When I conquer, play a Gold gear token exhausted."},
{n:"Poppy, Defender of the Meek",t:"Unit",d:"Order",ds:["Order"],e:6,m:5,kw:["Reaction", "Tank"],tx:"You may spend 3 XP as an additional cost to play me. If you do, I cost 3 less.[Ambush] (You may play me as a [Reaction] to a battlefield w"},
{n:"Poppy, Paragon",t:"Unit",d:"Body",ds:["Body"],e:5,m:5,kw:["Deflect"],tx:"[Deflect] (Opponents must pay Power to choose me with a spell or ability.)When you play me, if an opponent's score is within 3 points of t"},
{n:"Poro Herder",t:"Unit",d:"Calm",ds:["Calm"],e:3,m:3,kw:[],tx:"When you play me, if you control a Poro, buff me and draw 1. (If I don't have a buff, I get a +1 M buff.)"},
{n:"Portal Rescue",t:"Spell",d:"Mind",ds:["Mind"],e:3,m:null,kw:["Action"],tx:"[Action] (Play on your turn or in showdowns.)Banish a friendly unit, then its owner plays it to their base, ignoring its cost."},
{n:"Possession",t:"Spell",d:"Chaos",ds:["Chaos"],e:8,m:null,kw:["Action"],tx:"[Action] (Play on your turn or in showdowns.)Choose an enemy unit at a battlefield. Take control of it and recall it. (Send it to your base. This isn'"},
{n:"Pouty Poro",t:"Unit",d:"Fury",ds:["Fury"],e:2,m:2,kw:["Deflect"],tx:"[Deflect] (Opponents must pay Power to choose me with a spell or ability.)"},
{n:"Premonition",t:"Spell",d:"Mind",ds:["Mind"],e:2,m:null,kw:["Reaction"],tx:"[Reaction] (Play any time, even before spells and abilities resolve.)Draw 3."},
{n:"Prepared Neophyte",t:"Unit",d:"Fury",ds:["Fury"],e:3,m:1,kw:[],tx:"If you've spent 4 or more to play a spell this turn, I have +4 M."},
{n:"Primal Strength",t:"Spell",d:"Body",ds:["Body"],e:4,m:null,kw:["Action"],tx:"[Action] (Play on your turn or in showdowns.)Give a unit +7 M this turn."},
{n:"Production Surge",t:"Spell",d:"Mind",ds:["Mind"],e:4,m:null,kw:[],tx:"This costs 2 less if you control a Mech.Play a 3 M Mech unit token to your base.Draw 1."},
{n:"Progress Day",t:"Spell",d:"Mind",ds:["Mind"],e:6,m:null,kw:[],tx:"Draw 4."},
{n:"Promising Future",t:"Spell",d:"Mind",ds:["Mind"],e:5,m:null,kw:[],tx:"Each player looks at the top 5 cards of their Main Deck, banishes one of them, then recycles the rest. Starting with the next player, each player play"},
{n:"Punch First",t:"Spell",d:"Body",ds:["Body"],e:1,m:null,kw:["Action"],tx:"[Action] (Play on your turn or in showdowns.)Give a unit +5 M this turn."},
{n:"Pyke, Dockside Butcher",t:"Unit",d:"Fury",ds:["Fury"],e:3,m:2,kw:["Hidden", "Ganking"],tx:"[Hidden][Ganking]You may pay Fury as an additional cost to play me.When you play me, if you paid the additional cost, ready me and give me +"},
{n:"Raging Firebrand",t:"Unit",d:"Fury",ds:["Fury"],e:6,m:4,kw:[],tx:"When you play me, the next spell you play this turn costs 5 less."},
{n:"Rally the Troops",t:"Spell",d:"Order",ds:["Order"],e:2,m:null,kw:["Action"],tx:"[Action] (Play on your turn or in showdowns.)When a friendly unit is played this turn, buff it. (If it doesn't have a buff, it gets a +1 M bu"},
{n:"Reaver's Row",t:"Battlefield",d:"Colorless",ds:["Colorless"],e:null,m:null,kw:[],tx:"When you defend here, you may move a friendly unit here to base."},
{n:"Rebuke",t:"Spell",d:"Chaos",ds:["Chaos"],e:2,m:null,kw:["Action"],tx:"[Action] (Play on your turn or in showdowns.)Return a unit at a battlefield to its owner's hand."},
{n:"Reckoner's Arena",t:"Battlefield",d:"Colorless",ds:["Colorless"],e:null,m:null,kw:[],tx:"When you hold here, activate the conquer effects of units here."},
{n:"Recruit the Vanguard",t:"Spell",d:"Order",ds:["Order"],e:6,m:null,kw:["Action"],tx:"[Action] (Play on your turn or in showdowns.)Play four 1 M Recruit unit tokens. (They can be played to your base or to battlefields you contr"},
{n:"Red Brambleback",t:"Unit",d:"Fury",ds:["Fury"],e:4,m:4,kw:["Accelerate"],tx:"[Accelerate]Your conquer effects for conquering here trigger an additional time.When I conquer, [Buff] a friendly unit."},
{n:"Rek'Sai, Swarm Queen",t:"Unit",d:"Order",ds:["Order"],e:5,m:5,kw:[],tx:"When I attack, you may reveal the top 2 cards of your Main Deck. You may banish one, then play it. If it is a unit, you may play it here. Recycle the "},
{n:"Renata Glasc, Mastermind",t:"Unit",d:"Mind",ds:["Mind"],e:5,m:4,kw:[],tx:"1Mind Draw 1.4MindMindMindMind, [T] Score 1 point.Use my abilitie"},
{n:"Rengar, Pouncing",t:"Unit",d:"Fury",ds:["Fury"],e:3,m:3,kw:["Reaction", "Assault 2"],tx:"[Reaction] (Play any time, even before spells and abilities resolve, including to a battlefield you control.)[Assault 2] (+2 M while I'm an a"},
{n:"Rengar, Trophy Hunter",t:"Unit",d:"Body",ds:["Body"],e:5,m:6,kw:[],tx:"[Ambush]I can be played to a battlefield where there are enemy units."},
{n:"Repulse",t:"Spell",d:"Body",ds:["Body"],e:1,m:null,kw:["Reaction"],tx:"[Reaction] (Play any time, even before spells and abilities resolve.)Choose a friendly unit at a battlefield. Counter an enemy spell or ability that c"},
{n:"Revna the Lorekeeper",t:"Unit",d:"Fury",ds:["Fury"],e:7,m:7,kw:["Ganking"],tx:"[Ganking] (I can move from battlefield to battlefield.)When you play a spell, if you spent 4 or more, ready me."},
{n:"Rhasa the Sunderer",t:"Unit",d:"Chaos",ds:["Chaos"],e:10,m:6,kw:[],tx:"I cost 1 less for each card in your trash."},
{n:"Riposte",t:"Spell",d:"Body",ds:["Body", "Order"],e:2,m:null,kw:["Reaction"],tx:"[Reaction] (Play any time, even before spells and abilities resolve.)Choose a friendly unit and a spell. Counter that spell and give that unit +rb_mi"},
{n:"Ripper's Bay",t:"Battlefield",d:"Colorless",ds:["Colorless"],e:null,m:null,kw:[],tx:"When a unit here is returned to a player's hand, that player may pay 1 to channel 1 rune exhausted."},
{n:"Rocket Barrage",t:"Spell",d:"Mind",ds:["Mind"],e:4,m:null,kw:[],tx:"[Repeat] 4Mind (You may pay the additional cost to repeat this spell's effect, and may make different choices.)Choose one —Deal "},
{n:"Rockfall Path",t:"Battlefield",d:"Colorless",ds:["Colorless"],e:null,m:null,kw:[],tx:"Units can't be played here."},
{n:"Ruin Runner",t:"Unit",d:"Body",ds:["Body"],e:6,m:5,kw:[],tx:"I can't be chosen by enemy spells and abilities."},
{n:"Ruined Rex",t:"Unit",d:"Mind",ds:["Mind"],e:6,m:6,kw:["Deathknell"],tx:"[Deathknell][ ] Deal 4 to an enemy unit. (When I die, get the effect.)"},
{n:"Rumble, Hotheaded",t:"Unit",d:"Fury",ds:["Fury"],e:4,m:4,kw:[],tx:"Your Mechs each have [Assault]. (+1 M while we're attackers.)When I conquer, you may recycle another friendly unit to play a Mech from your t"},
{n:"Rumble, Scrapper",t:"Unit",d:"Mind",ds:["Mind"],e:5,m:4,kw:[],tx:"Your Mechs have +1 M (including me).When I hold, play a 3 M Mech unit token to your base."},
{n:"Rune Prison",t:"Spell",d:"Calm",ds:["Calm"],e:2,m:null,kw:["Action"],tx:"[Action] (Play on your turn or in showdowns.)Stun a unit. (It doesn't deal combat damage this turn.)"},
{n:"Sacrifice",t:"Spell",d:"Order",ds:["Order"],e:1,m:null,kw:["Reaction"],tx:"[Reaction] (Play any time, even before spells and abilities resolve.)As an additional cost to play this, kill a friendly [Mighty] unit. (A unit is Mig"},
{n:"Safety Inspector",t:"Unit",d:"Order",ds:["Order"],e:5,m:3,kw:[],tx:"You may spend 3 XP as an additional cost to play me.When you play me, each player must kill one of their units. If you paid my additional cost, you do"},
{n:"Salvage",t:"Spell",d:"Order",ds:["Order"],e:2,m:null,kw:["Action"],tx:"[Action] (Play on your turn or in showdowns.)You may kill up to one gear. Draw 1."},
{n:"Sandshifter",t:"Unit",d:"Order",ds:["Order"],e:5,m:6,kw:[],tx:"When you play me, kill an enemy unit with 3 M or less."},
{n:"Scorchclaw",t:"Unit",d:"Fury",ds:["Fury"],e:3,m:3,kw:[],tx:"[Hunt 2] (When I conquer or hold, gain 2 XP.)[Level 3][ ] I have +1 M and enter ready. (While you have 3+ XP, get the effect.)"},
{n:"Scrapyard Champion",t:"Unit",d:"Fury",ds:["Fury"],e:5,m:5,kw:["Legion"],tx:"[Legion] — When you play me, discard 2, then draw 2. (Get the effect if you've played another card this turn.)"},
{n:"Sea Monkey",t:"Unit",d:"Body",ds:["Body"],e:2,m:2,kw:[],tx:"You may pay 1 as an additional cost to play me.When you play me, if you paid the additional cost, buff me. (Give me a +1 M buff i"},
{n:"Sentinel Adept",t:"Unit",d:"Fury",ds:["Fury"],e:3,m:3,kw:[],tx:"[Weaponmaster] (When you play me, you may [Equip] one of your Equipment to me for Power less, even if it's already attached.)"},
{n:"Sett, Brawler",t:"Unit",d:"Body",ds:["Body"],e:5,m:4,kw:[],tx:"When I'm played and when I conquer, buff me. (If I don't have a buff, I get a +1 M buff.)Spend my buff Give me +4 M this turn."},
{n:"Shadow",t:"Unit",d:"Calm",ds:["Calm", "Chaos"],e:3,m:3,kw:["Action"],tx:"If you play me to a battlefield, I enter ready.[Action][ ] 1Power, [T] [Stun] an enemy unit attacking here. (It does"},
{n:"Shadow Watcher",t:"Unit",d:"Calm",ds:["Calm"],e:4,m:5,kw:[],tx:"If a friendly unit died during your Beginning Phase this turn, I enter ready."},
{n:"Shadow's Call",t:"Spell",d:"Order",ds:["Order"],e:2,m:null,kw:["Temporary", "Temporary"],tx:"Choose a friendly unit without [Temporary]. Give it [Temporary]. Draw 2. (Kill it at the start of its controller's Beginning Phase, before scoring.)"},
{n:"Shakedown",t:"Spell",d:"Fury",ds:["Fury"],e:2,m:null,kw:["Reaction"],tx:"[Reaction] (Play any time, even before spells and abilities resolve.)Choose an enemy unit. Deal 6 to it unless its controller has you draw 2."},
{n:"Sharkling",t:"Unit",d:"Fury",ds:["Fury"],e:3,m:1,kw:["Accelerate", "Assault 4"],tx:"[Accelerate] (You may pay 1Fury as an additional cost to have me enter ready.)[Assault 4] (+4 M while I'm an attacker.)"},
{n:"Shen, Kinkou",t:"Unit",d:"Order",ds:["Order"],e:3,m:3,kw:["Reaction", "Shield 2", "Tank"],tx:"[Reaction] (Play any time, even before spells and abilities resolve, including to a battlefield you control.)[Shield 2] (+2 M while I'm a def"},
{n:"Show of Strength",t:"Spell",d:"Body",ds:["Body"],e:2,m:null,kw:["Reaction"],tx:"[Reaction] (Play any time, even before spells and abilities resolve.)Draw 1 for each of your [Mighty] units. (A unit is Mighty while it has 5+ rb_mig"},
{n:"Showstopper",t:"Spell",d:"Body",ds:["Body", "Order"],e:1,m:null,kw:[],tx:"Buff a friendly unit in your base, then move it to a battlefield. (If it doesn't have a buff, it gets a +1 M buff.)"},
{n:"Sigil of the Storm",t:"Battlefield",d:"Colorless",ds:["Colorless"],e:null,m:null,kw:[],tx:"When you conquer here, you must recycle one of your runes. (This doesn’t choose anything.)"},
{n:"Simian Ancestor",t:"Unit",d:"Calm",ds:["Calm"],e:5,m:5,kw:[],tx:"When you buff me, ready me."},
{n:"Sinister Poro",t:"Unit",d:"Chaos",ds:["Chaos"],e:2,m:1,kw:[],tx:"When I attack, you may pay 1 to move an enemy unit here to its base."},
{n:"Siphon Power",t:"Spell",d:"Mind",ds:["Mind", "Order"],e:2,m:null,kw:["Reaction"],tx:"[Reaction] (Play any time, even before spells and abilities resolve.)Choose a battlefield. Give friendly units there +1 M this turn and enemy"},
{n:"Sivir, Ambitious",t:"Unit",d:"Body",ds:["Body"],e:6,m:7,kw:[],tx:"[Deflect 2] (Opponents must pay PowerPower to choose me with a spell or Ability.)When I conquer after an attack, if you assign"},
{n:"Sivir, Mercenary",t:"Unit",d:"Chaos",ds:["Chaos"],e:4,m:4,kw:["Accelerate", "Ganking"],tx:"[Accelerate] (You may pay 1Chaos as an additional cost to have me enter ready.)If you've spent at least Powerrb_run"},
{n:"Sky Splitter",t:"Spell",d:"Fury",ds:["Fury"],e:8,m:null,kw:["Action"],tx:"[Action] (Play on your turn or in showdowns.)This spell's Energy cost is reduced by the highest Might among units you control.Deal 5 to a unit at a ba"},
{n:"Smite",t:"Spell",d:"Fury",ds:["Fury"],e:2,m:null,kw:["Action"],tx:"[Action] (Play on your turn or in showdowns.)Deal 3 to a unit at a battlefield. If it would die this turn, banish it instead."},
{n:"Smoke Screen",t:"Spell",d:"Mind",ds:["Mind"],e:2,m:null,kw:["Reaction"],tx:"[Reaction] (Play any time, even before spells and abilities resolve.)Give a unit -4 M this turn, to a minimum of 1 M."},
{n:"Smoke and Mirrors",t:"Spell",d:"Mind",ds:["Mind"],e:2,m:null,kw:["Hidden", "Action", "Temporary"],tx:"[Hidden] (Hide now for Power to react with later for 0.)[Action] (Play on your turn or in showdowns.)Choose a unit you control"},
{n:"Sneaky Deckhand",t:"Unit",d:"Chaos",ds:["Chaos"],e:3,m:2,kw:[],tx:"You may play me to an open battlefield."},
{n:"Soaring Scout",t:"Unit",d:"Order",ds:["Order"],e:2,m:1,kw:["Deathknell"],tx:"[Deathknell] — Channel 1 rune exhausted. (When I die, get the effect.)"},
{n:"Solari Chief",t:"Unit",d:"Order",ds:["Order"],e:5,m:4,kw:[],tx:"When you play me, choose an enemy unit. If it is stunned, kill it. Otherwise, stun it. (It doesn't deal combat damage this turn.)"},
{n:"Sona, Harmonious",t:"Unit",d:"Calm",ds:["Calm"],e:4,m:4,kw:[],tx:"At the end of your turn, if I'm at a battlefield, ready up to 4 friendly runes."},
{n:"Soraka, Wanderer",t:"Unit",d:"Order",ds:["Order"],e:4,m:4,kw:[],tx:"I must be assigned combat damage last.If another unit you control here would die, if it has less Might than me, instead heal it, exhaust it, and recal"},
{n:"Soul Harvest",t:"Spell",d:"Order",ds:["Order"],e:2,m:null,kw:[],tx:"Kill a unit at a battlefield with 3 M or less."},
{n:"Soulgorger",t:"Unit",d:"Chaos",ds:["Chaos"],e:8,m:5,kw:[],tx:"When you play me, you may play a unit from your trash, ignoring its Energy cost. (You must still pay its Power cost.)"},
{n:"Sprite Burst",t:"Spell",d:"Mind",ds:["Mind"],e:5,m:null,kw:["Temporary"],tx:"Play two ready 3 M Sprite unit tokens with [Temporary]. (Kill each at the start of its controller's Beginning Phase, before scoring.)"},
{n:"Sprite Mother",t:"Unit",d:"Mind",ds:["Mind"],e:4,m:3,kw:["Temporary"],tx:"When you play me, play a ready 3 M Sprite unit token with [Temporary] here. (Kill it at the start of its controller's Beginning Phase, before"},
{n:"Square Up",t:"Spell",d:"Fury",ds:["Fury"],e:4,m:null,kw:["Assault 4"],tx:"[Repeat] — Discard 1 (You may pay the additional cost to repeat this spell's effect.)Give a unit [Assault 4] this turn. (+4 M while it's an a"},
{n:"Stacked Deck",t:"Spell",d:"Chaos",ds:["Chaos"],e:1,m:null,kw:["Action"],tx:"[Action] (Play on your turn or in showdowns.)Look at the top 3 cards of your Main Deck. Put 1 into your hand and recycle the rest."},
{n:"Stalking Wolf",t:"Unit",d:"Order",ds:["Order"],e:4,m:6,kw:["Reaction"],tx:"[Ambush] (You may play me as a [Reaction] to a battlefield where you have units.)As an additional cost to play me, kill a Bird, Cat, Dog, or Poro you "},
{n:"Stand United",t:"Spell",d:"Calm",ds:["Calm"],e:3,m:null,kw:["Hidden", "Action"],tx:"[Hidden] (Hide now for Power to react with later for 0.)[Action] (Play on your turn or in showdowns.)Buff a friendly unit. Buf"},
{n:"Star Spring",t:"Battlefield",d:"Colorless",ds:["Colorless"],e:null,m:null,kw:[],tx:"The first time a player plays a non-token unit here each turn, they may move another unit they control here to its base."},
{n:"Star-Crossed",t:"Spell",d:"Chaos",ds:["Chaos"],e:3,m:null,kw:["Reaction"],tx:"[Reaction] (Play any time, even before spells and abilities resolve.)Return a friendly unit and an enemy unit to their owners' hands."},
{n:"Stare Down",t:"Spell",d:"Body",ds:["Body"],e:2,m:null,kw:[],tx:"Choose a friendly unit and a battlefield. Move all enemy units at that battlefield with less Might than the chosen unit to their base. Gain 1 XP."},
{n:"Startipped Peak",t:"Battlefield",d:"Colorless",ds:["Colorless"],e:null,m:null,kw:[],tx:"When you hold here, you may channel 1 rune exhausted."},
{n:"Stormbringer",t:"Spell",d:"Fury",ds:["Fury", "Body"],e:6,m:null,kw:[],tx:"Choose a friendly unit in your base. Deal damage equal to its Might to all enemy units at a battlefield, then move your unit there."},
{n:"Stupefy",t:"Spell",d:"Mind",ds:["Mind"],e:1,m:null,kw:["Reaction"],tx:"[Reaction] (Play any time, even before spells and abilities resolve.)Give a unit -1 M this turn, to a minimum of 1 M. Draw 1."},
{n:"Sudden Storm",t:"Spell",d:"Fury",ds:["Fury"],e:3,m:null,kw:["Hidden", "Action"],tx:"[Hidden] (Hide now for Power to react with later for 0.)[Action] (Play on your turn or in showdowns.)Deal 2 to a unit at a bat"},
{n:"Sunken Temple",t:"Battlefield",d:"Colorless",ds:["Colorless"],e:null,m:null,kw:[],tx:"When you conquer here with one or more [Mighty] units, you may pay 1 to draw 1. (A unit is Mighty while it has 5+ M.)"},
{n:"Super Mega Death Rocket!",t:"Spell",d:"Fury",ds:["Fury", "Chaos"],e:4,m:null,kw:[],tx:"Deal 5 to a unit.When you conquer, you may discard 1 to return this from your trash to your hand."},
{n:"Tactical Retreat",t:"Spell",d:"Order",ds:["Order"],e:2,m:null,kw:["Reaction"],tx:"[Reaction] (Play any time, even before spells and abilities resolve.)Choose a friendly unit. The next time it would die this turn, heal it, exhaust it"},
{n:"Taric, Protector",t:"Unit",d:"Calm",ds:["Calm"],e:4,m:4,kw:["Tank"],tx:"[Shield] (+1 M while I'm a defender.)[Tank] (I must be assigned combat damage first.)Other friendly units here have [Shield]."},
{n:"Tasty Faefolk",t:"Unit",d:"Calm",ds:["Calm"],e:7,m:6,kw:["Accelerate", "Deathknell"],tx:"[Accelerate] (You may pay 1Calm as an additional cost to have me enter ready.)[Deathknell] — Channel 2 runes exhausted and draw "},
{n:"Teemo, Scout",t:"Unit",d:"Chaos",ds:["Chaos"],e:2,m:1,kw:["Hidden"],tx:"[Hidden] (Hide now for Power to react with later for 0.)When you play me, give me +3 M this turn."},
{n:"Teemo, Strategist",t:"Unit",d:"Mind",ds:["Mind"],e:2,m:2,kw:["Hidden", "Hidden", "Hidden"],tx:"[Hidden] (Hide now for Power to react with later for 0.)When I defend or I'm played from [Hidden], reveal the top 5 cards of y"},
{n:"Temptation",t:"Spell",d:"Chaos",ds:["Chaos"],e:2,m:null,kw:[],tx:"[Repeat] 2 (You may pay the additional cost to repeat this spell's effect.)Move an enemy unit to a location where there's a unit with the "},
{n:"The Academy",t:"Battlefield",d:"Colorless",ds:["Colorless"],e:null,m:null,kw:[],tx:"When you hold here, give your next spell this turn [Repeat] equal to its base cost. (You may pay the additional cost to repeat the spell's effect.)"},
{n:"The Candlelit Sanctum",t:"Battlefield",d:"Colorless",ds:["Colorless"],e:null,m:null,kw:[],tx:"When you conquer here, look at the top two cards of your Main Deck. You may recycle one or both of them. Put those you don't back in any order."},
{n:"The Grand Plaza",t:"Battlefield",d:"Colorless",ds:["Colorless"],e:null,m:null,kw:[],tx:"When you hold here, if you have 7+ units here, you win the game."},
{n:"The Harrowing",t:"Spell",d:"Chaos",ds:["Chaos"],e:6,m:null,kw:[],tx:"Play a unit from your trash, ignoring its Energy cost. (You must still pay its Power cost.)"},
{n:"The Papertree",t:"Battlefield",d:"Colorless",ds:["Colorless"],e:null,m:null,kw:[],tx:"When you hold here, each player channels 1 rune exhausted."},
{n:"Thousand-Tailed Watcher",t:"Unit",d:"Mind",ds:["Mind"],e:7,m:7,kw:["Accelerate"],tx:"[Accelerate] (You may pay 1Mind as an additional cost to have me enter ready.)When you play me, give enemy units -3 M t"},
{n:"Thrill of the Hunt",t:"Spell",d:"Fury",ds:["Fury", "Body"],e:2,m:null,kw:["Reaction"],tx:"[Reaction] (Play any time, even before spells and abilities resolve.)Banish a friendly unit, then its owner plays it to any battlefield, ignoring its "},
{n:"Tianna Crownguard",t:"Unit",d:"Calm",ds:["Calm"],e:7,m:4,kw:["Deflect"],tx:"[Deflect] (Opponents must pay Power to choose me with a spell or ability.)While I'm at a battlefield, opponents can't gain points."},
{n:"Tideturner",t:"Unit",d:"Chaos",ds:["Chaos"],e:2,m:2,kw:["Hidden"],tx:"[Hidden] (Hide now for Power to react with later for 0.)When you play me, you may choose a unit you control at another locatio"},
{n:"Time Warp",t:"Spell",d:"Mind",ds:["Mind"],e:10,m:null,kw:[],tx:"Take a turn after this one. Banish this."},
{n:"Towering Pairofant",t:"Unit",d:"Fury",ds:["Fury"],e:6,m:6,kw:[],tx:"[Assault] (+1 M while I'm an attacker.)If a unit died this turn, I enter ready."},
{n:"Trapping Grounds",t:"Battlefield",d:"Colorless",ds:["Colorless"],e:null,m:null,kw:["Deflect"],tx:"When you conquer here, if you assigned 3 or more excess damage, play a 1 M Bird unit token with [Deflect]."},
{n:"Traveling Merchant",t:"Unit",d:"Chaos",ds:["Chaos"],e:2,m:2,kw:[],tx:"When I move, discard 1, then draw 1."},
{n:"Treasure Hunter",t:"Unit",d:"Chaos",ds:["Chaos"],e:2,m:1,kw:[],tx:"When I move, play a Gold gear token exhausted."},
{n:"Trevor Snoozebottom",t:"Unit",d:"Calm",ds:["Calm"],e:3,m:3,kw:["Temporary"],tx:"[Shield] (+1 M while I'm a defender.)When I hold, play a ready 3 M Sprite unit token with [Temporary] here. (Kill it at the start of"},
{n:"Tricksy Tentacles",t:"Spell",d:"Calm",ds:["Calm"],e:4,m:null,kw:[],tx:"Move any number of enemy units with the same controller and a total Might of 8 or less to a single location."},
{n:"Trifarian Gloryseeker",t:"Unit",d:"Order",ds:["Order"],e:2,m:2,kw:["Legion"],tx:"[Legion] — When you play me, buff me. (If I don't have a buff, I get a +1 M buff. Get the effect if you've played another card this turn.)"},
{n:"Trusty Ramhound",t:"Unit",d:"Order",ds:["Order"],e:2,m:2,kw:[],tx:"While you have another unit here, I have +1 M."},
{n:"Tryndamere, Barbarian",t:"Unit",d:"Fury",ds:["Fury"],e:7,m:8,kw:[],tx:"When I conquer after an attack, if you assigned 5 or more excess damage to enemy units, you score 1 point."},
{n:"Undercover Agent",t:"Unit",d:"Chaos",ds:["Chaos"],e:5,m:5,kw:["Deathknell"],tx:"[Deathknell] — Discard 2, then draw 2. (When I die, get the effect.)"},
{n:"Undying Legion",t:"Unit",d:"Fury",ds:["Fury"],e:3,m:3,kw:["Legion"],tx:"[Legion][ ] You may play me from your trash for 3Fury. (Get the effect if you've played another card this turn.)"},
{n:"Undying Loyalty",t:"Spell",d:"Order",ds:["Order"],e:2,m:null,kw:[],tx:"This costs 2 less if you choose a Bird, Cat, Dog, or Poro.Play a unit with cost no more than 2 and no more than rb_rune_rainb"},
{n:"Unforgiven",t:"Legend",d:"Calm",ds:["Calm", "Chaos"],e:null,m:null,kw:[],tx:"2, [T] Move a friendly unit to or from its base."},
{n:"Unsung Hero",t:"Unit",d:"Order",ds:["Order"],e:2,m:2,kw:["Deathknell"],tx:"[Deathknell] — If I was [Mighty], draw 2. (When I die, get the effect. I'm Mighty while I have 5+ M.)"},
{n:"Unyielding Spirit",t:"Spell",d:"Body",ds:["Body"],e:1,m:null,kw:["Reaction"],tx:"[Reaction] (Play any time, even before spells and abilities resolve.)Prevent all spell and ability damage this turn."},
{n:"Vanguard Captain",t:"Unit",d:"Order",ds:["Order"],e:3,m:3,kw:["Legion"],tx:"[Legion] — When you play me, play two 1 M Recruit unit tokens here. (Get the effect if you've played another card this turn.)"},
{n:"Vanguard Sergeant",t:"Unit",d:"Order",ds:["Order"],e:4,m:4,kw:[],tx:""},
{n:"Vault Breaker",t:"Spell",d:"Fury",ds:["Fury"],e:1,m:null,kw:["Action", "Assault 2", "Ganking"],tx:"[Action] (Play on your turn or in showdowns.)Give a unit [Assault 2] and [Ganking] this turn. (+2 M while it's an attacker. It can move from "},
{n:"Vayne, Hunter",t:"Unit",d:"Fury",ds:["Fury"],e:4,m:2,kw:["Assault 3"],tx:"[Assault 3] (+3 M while I'm an attacker.)If an opponent controls a battlefield, I enter ready.When I conquer, you may pay 1 to re"},
{n:"Veiled Temple",t:"Battlefield",d:"Colorless",ds:["Colorless"],e:null,m:null,kw:[],tx:"When you conquer here, you may ready a friendly gear. If it's an Equipment, you may detach it."},
{n:"Vengeance",t:"Spell",d:"Order",ds:["Order"],e:4,m:null,kw:[],tx:"Kill a unit."},
{n:"Veteran Poro",t:"Unit",d:"Body",ds:["Body"],e:2,m:2,kw:[],tx:"[Weaponmaster] (When you play me, you may [Equip] one of your Equipment to me for Power less, even if it's already attached.)"},
{n:"Vex, Apathetic",t:"Unit",d:"Chaos",ds:["Chaos"],e:4,m:4,kw:["Deflect"],tx:"[Deflect]When an opponent plays a unit while I'm at a battlefield, [Stun] it. They can't move it this turn."},
{n:"Vex, Cheerless",t:"Unit",d:"Chaos",ds:["Chaos"],e:5,m:5,kw:[],tx:"While I'm in combat, friendly spells cost 1Power less to a minimum of 1, and enemy spells cost 1rb_ru"},
{n:"Vi, Destructive",t:"Unit",d:"Fury",ds:["Fury"],e:2,m:3,kw:["Ganking"],tx:"[Ganking] (I can move from battlefield to battlefield.)Recycle 1 from your trash Give me +1 M this turn."},
{n:"Vi, Hotheaded",t:"Unit",d:"Fury",ds:["Fury"],e:4,m:3,kw:["Deflect"],tx:"[Deflect] (Opponents must pay Power to choose me with a spell or ability.)2Fury Double my Might this turn."},
{n:"Vi, Peacekeeper",t:"Unit",d:"Order",ds:["Order"],e:5,m:5,kw:[],tx:"[Ambush]When I attack, [Stun] an enemy unit here."},
{n:"Viktor, Innovator",t:"Unit",d:"Mind",ds:["Mind"],e:4,m:3,kw:[],tx:"When you play a card on an opponent's turn, play a 1 M Recruit unit token in your base."},
{n:"Viktor, Leader",t:"Unit",d:"Order",ds:["Order"],e:4,m:4,kw:[],tx:"When another non-Recruit unit you control dies, play a 1 M Recruit unit token into your base."},
{n:"Vilemaw",t:"Unit",d:"Calm",ds:["Calm"],e:8,m:8,kw:[],tx:"[Ambush]Enemy units here with less Might than me don't deal combat damage.When I hold, draw 1."},
{n:"Vilemaw's Lair",t:"Battlefield",d:"Colorless",ds:["Colorless"],e:null,m:null,kw:[],tx:"Units can't move from here to base."},
{n:"Void Assault",t:"Spell",d:"Body",ds:["Body", "Chaos"],e:2,m:null,kw:[],tx:"Move a friendly unit, then move an enemy unit. (If they both move to a battlefield you don't control, you're the attacker.)"},
{n:"Void Gate",t:"Battlefield",d:"Colorless",ds:["Colorless"],e:null,m:null,kw:[],tx:"Spells and abilities deal 1 Bonus Damage to units here. (Each instance of damage the spell deals to a unit here is increased by 1.)"},
{n:"Void Hatchling",t:"Unit",d:"Fury",ds:["Fury"],e:2,m:2,kw:[],tx:"If you would reveal cards from a deck, look at the top card first. You may recycle it. Then reveal those cards."},
{n:"Void Rush",t:"Spell",d:"Fury",ds:["Fury", "Order"],e:2,m:null,kw:[],tx:"Reveal the top 2 cards of your Main Deck. You may banish one, then play it, reducing its cost by 2. Draw any you didn't banish."},
{n:"Void Seeker",t:"Spell",d:"Fury",ds:["Fury"],e:3,m:null,kw:["Action"],tx:"[Action] (Play on your turn or in showdowns.)Deal 4 to a unit at a battlefield. Draw 1."},
{n:"Volibear, Imposing",t:"Unit",d:"Body",ds:["Body"],e:12,m:10,kw:["Shield 3", "Tank"],tx:"[Shield 3] (+3 M while I'm a defender.)[Tank] (I must be assigned combat damage first.)When an opponent moves to a battlefield other than min"},
{n:"Voracious Gromp",t:"Unit",d:"Body",ds:["Body"],e:5,m:5,kw:[],tx:"[Hunt 3] (When I conquer or hold, gain 3 XP.)"},
{n:"Wages of Pain",t:"Spell",d:"Mind",ds:["Mind"],e:3,m:null,kw:["Hidden", "Action"],tx:"[Hidden] (Hide now for Power to react with later for 0.)[Action] (Play on your turn or in showdowns.)Deal 3 to a unit at a bat"},
{n:"Wallop",t:"Spell",d:"Body",ds:["Body"],e:2,m:null,kw:["Action"],tx:"[Action] (Play on your turn or in showdowns.)As you play this, you may spend a buff as an additional cost. If you do, ignore this spell's cost.Ready a"},
{n:"Watchful Sentry",t:"Unit",d:"Mind",ds:["Mind"],e:2,m:1,kw:["Deathknell"],tx:"[Deathknell] — Draw 1. (When I die, get the effect.)"},
{n:"Whirlwind",t:"Spell",d:"Chaos",ds:["Chaos"],e:3,m:null,kw:[],tx:"Starting with the next player, each player may return a unit to its owner's hand."},
{n:"Wildclaw Shaman",t:"Unit",d:"Body",ds:["Body"],e:4,m:3,kw:[],tx:"When you play me, you may spend a buff to buff me and ready me. (If I don't have a buff, I get a +1 M buff.)"},
{n:"Wily Newtfish",t:"Unit",d:"Body",ds:["Body"],e:4,m:4,kw:["Ganking"],tx:"If you've gained XP this turn, I have +1 M and [Ganking]. (I can move from battlefield to battlefield.)"},
{n:"Wind Wall",t:"Spell",d:"Calm",ds:["Calm"],e:3,m:null,kw:["Reaction"],tx:"[Reaction] (Play any time, even before spells and abilities resolve.)Counter a spell."},
{n:"Windsinger",t:"Unit",d:"Chaos",ds:["Chaos"],e:2,m:1,kw:[],tx:"Hidden (Hide now for Power to react with later for 0.)When you play me, you may return another unit at a battlefield with 3 r"},
{n:"Windswept Hillock",t:"Battlefield",d:"Colorless",ds:["Colorless"],e:null,m:null,kw:["Ganking"],tx:"Units here have [Ganking]. (They can move from battlefield to battlefield.)"},
{n:"Wuju Apprentice",t:"Unit",d:"Calm",ds:["Calm"],e:2,m:2,kw:[],tx:"[Hunt] (When I conquer or hold, gain 1 XP.)[Level 6][ ] When you play me, draw 1. (While you have 6+ XP, get the effect.)"},
{n:"Wuju Bladesman - Starter",t:"Legend",d:"Calm",ds:["Calm", "Body"],e:null,m:null,kw:[],tx:"While a friendly unit defends alone, it gets +2 M."},
{n:"Xerath, Freed",t:"Unit",d:"Fury",ds:["Fury"],e:5,m:5,kw:[],tx:"Fury, [T] Deal 3 to a unit. Use this ability only while I'm at a battlefield."},
{n:"Yasuo, Remorseful",t:"Unit",d:"Calm",ds:["Calm"],e:6,m:6,kw:[],tx:"When I attack, deal damage equal to my Might to an enemy unit here."},
{n:"Yasuo, Windrider",t:"Unit",d:"Chaos",ds:["Chaos"],e:5,m:4,kw:["Ganking"],tx:"[Ganking] (I can move from battlefield to battlefield.)The third time I move in a turn, you score 1 point."},
{n:"Yeti Brawler",t:"Unit",d:"Fury",ds:["Fury"],e:6,m:6,kw:["Reaction"],tx:"When I conquer, if you assigned 3 or more excess damage, play two Gold gear tokens exhausted. (They have  [Reaction][ ] Kill this, [T] [Add]"},
{n:"Yi, Honed",t:"Unit",d:"Body",ds:["Body"],e:7,m:6,kw:["Ganking"],tx:"[Ganking] (I can move from battlefield to battlefield.)I enter ready."},
{n:"Yone, Blademaster",t:"Unit",d:"Body",ds:["Body"],e:5,m:5,kw:[],tx:"[Weaponmaster] (When you play me, you may [Equip] one of your Equipment to me for Power less, even if it's already attached.)When I conque"},
{n:"Zaun Punk",t:"Unit",d:"Order",ds:["Order"],e:3,m:3,kw:[],tx:"You may kill a friendly gear as an additional cost to play me.When you play me, if you paid the additional cost, kill a gear."},
{n:"Zaun Warrens",t:"Battlefield",d:"Colorless",ds:["Colorless"],e:null,m:null,kw:[],tx:"When you conquer here, discard 1, then draw 1."},
];
var DECKS={
"Lee Sin (Calm/Body)":{legend:"Blind Monk",champ:"Lee Sin, Centered",deck:["First Mate", "Caitlyn, Patrolling", "Laurent Bladekeeper", "Pakaa Cub", "Nidalee, Cat Form", "Apprentice Smith", "Disarming Rake", "Buhru Captain", "Shadow", "Trevor Snoozebottom", "Sona, Harmonious", "Dune Drake", "Imposing Challenger", "Ornn, Blacksmith", "Kinkou Monk", "Herald of Scales", "Yone, Blademaster", "Dauntless Vanguard", "Mountain Drake", "Alpha Wildclaw", "Tianna Crownguard", "Eclipse Herald", "Concentrate", "Combat Experience", "Meditation", "Dragon's Rage", "Rune Prison", "Primal Strength", "Emperor's Divide", "Mystic Reversal", "Wallop", "Decisive Strike", "Repulse", "Overt Operation", "Riposte", "Marching Orders", "Yasuo, Remorseful", "Yi, Honed", "Wind Wall", "Keeper's Verdict"],bfs:["Marai Spire", "Dusk Rose Lab", "Void Gate"],runes:["Calm", "Calm", "Calm", "Calm", "Calm", "Calm", "Body", "Body", "Body", "Body", "Body", "Body"]},
"Caitlyn (Body/Chaos)":{legend:"Bounty Hunter",champ:"Caitlyn, Patrolling",deck:["Loyal Pup", "Treasure Hunter", "Mister Root", "Teemo, Scout", "Crowd Favorite", "Sinister Poro", "Black Market Broker", "Sea Monkey", "Evelynn, Entrancing", "Bewitching Spirit", "Undercover Agent", "Yasuo, Windrider", "Jae Medarda", "Poppy, Paragon", "Rengar, Trophy Hunter", "Akshan, Mischievous", "Vex, Cheerless", "Yone, Blademaster", "Sivir, Ambitious", "Megatusk", "Maduli the Gatekeeper", "Jaull-Fish", "Acceptable Losses", "Catalyst of Aeons", "Riposte", "Confront", "Fading Memories", "Grim Resolve", "Stare Down", "Showstopper", "Existential Dread", "On the Hunt", "Flash", "Downwell", "Invert Timelines", "Bullet Time", "Void Assault", "Call to Battle", "Crescent Guardian", "Repulse"],bfs:["Minefield", "The Candlelit Sanctum", "Rockfall Path"],runes:["Body", "Body", "Body", "Body", "Body", "Body", "Chaos", "Chaos", "Chaos", "Chaos", "Chaos", "Chaos"]},
"Annie (Fury/Chaos)":{legend:"Dark Child - Starter",champ:"Annie, Fiery",deck:["Evershade Stalker", "Dangerous Duo", "Bewitching Spirit", "Sinister Poro", "Inferna", "Sharkling", "Ezreal, Prodigy", "Overzealous Fan", "Grim Apothecary", "Vi, Destructive", "Ancient Warmonger", "Sivir, Mercenary", "Nocturne, Horrifying", "Jhin, Murderous Artist", "Darius, Trifarian", "Vi, Hotheaded", "Captain Farron", "Annie, Stubborn", "Kadregrin the Infernal", "Megatusk", "Armed Assailant", "Rhasa the Sunderer", "Blood Rush", "Sky Splitter", "Vault Breaker", "Downwell", "Gust", "Temptation", "Get Excited!", "Morbid Return", "Square Up", "Abandon", "Acceptable Losses", "Angle Shot", "Void Rush", "Noxian Guillotine", "Void Hatchling", "Void Rush", "Jinx, Demolitionist", "Jinx, Demolitionist"],bfs:["Trapping Grounds", "Brush", "Zaun Warrens"],runes:["Fury", "Fury", "Fury", "Fury", "Fury", "Fury", "Chaos", "Chaos", "Chaos", "Chaos", "Chaos", "Chaos"]},
"Kai\'Sa (Fury/Mind)":{legend:"Daughter of the Void",champ:"Kai\'Sa, Evolutionary",deck:["Pit Crew", "Noxus Saboteur", "Immortal Phoenix", "Card Sharp", "Teemo, Strategist", "Aspiring Engineer", "Plundering Poro", "Pyke, Dockside Butcher", "Undying Legion", "Chemtech Enforcer", "Xerath, Freed", "Malzahar, Fanatic", "Jhin, Murderous Artist", "Viktor, Innovator", "Draven, Showboat", "Arena Kingpin", "Lord Broadmane", "Jhin, Meticulous Killer", "Ruined Rex", "Magma Wurm", "Dunebreaker", "Revna the Lorekeeper", "Sky Splitter", "Vault Breaker", "Final Spark", "Thrill of the Hunt", "Portal Rescue", "Piercing Light", "Dancing Grenade", "Sprite Burst", "Stormbringer", "Eclipse", "Progress Day", "Monster Harpoon", "Smoke Screen", "Falling Star", "Sprite Mother", "Card Sharp", "Blazing Scorcher", "Bubble Bot"],bfs:["Reaver's Row", "Vilemaw's Lair", "Sigil of the Storm"],runes:["Fury", "Fury", "Fury", "Fury", "Fury", "Fury", "Mind", "Mind", "Mind", "Mind", "Mind", "Mind"]},
"Vex (Calm/Chaos)":{legend:"Gloomist",champ:"Vex, Apathetic",deck:["Sneaky Deckhand", "Fizz, Trickster", "Wuju Apprentice", "Legion Quartermaster", "Poro Herder", "Evershade Stalker", "Teemo, Scout", "Mister Root", "Tideturner", "Black Market Broker", "Diana, No Longer Human", "Playful Phantom", "Vex, Cheerless", "Crescent Guardian", "Ahri, Alluring", "Irelia, Fervent", "Kha'Zix, Mutating Horror", "Taric, Protector", "Yasuo, Remorseful", "Iascylla", "Soulgorger", "Leona, Zealot", "Discipline", "Stacked Deck", "Wind Wall", "Feral Strength", "Conscription", "Highlander", "Tricksy Tentacles", "Isolate", "Invert Timelines", "Emperor's Divide", "Called Shot", "Fading Memories", "Alpha Strike", "Heedless Resurrection", "Party Favors", "Bewitching Spirit", "Teemo, Scout", "Eclipse Herald"],bfs:["Rockfall Path", "The Papertree", "Dusk Rose Lab"],runes:["Calm", "Calm", "Calm", "Calm", "Calm", "Calm", "Chaos", "Chaos", "Chaos", "Chaos", "Chaos", "Chaos"]},
"Fiora (Body/Order)":{legend:"Grand Duelist",champ:"Fiora, Peerless",deck:["Nilah, Joyful Ascetic", "Soaring Scout", "Trifarian Gloryseeker", "Lucian, Merciless", "Dragonsoul Sage", "Fiora, Worthy", "Determined Sentry", "Sea Monkey", "Karthus, Eternal", "Loyal Poro", "Poppy, Paragon", "Ashe, Focused", "Voracious Gromp", "Sandshifter", "Machine Evangel", "Azir, Sovereign", "Akshan, Mischievous", "Vi, Peacekeeper", "Sivir, Ambitious", "Bilgewater Bully", "Commander Ledros", "Gentle Gemdragon", "Marching Orders", "Vengeance", "Blast of Power", "Catalyst of Aeons", "Punch First", "Showstopper", "Sacrifice", "Heroic Charge", "Concentrate", "Salvage", "King's Edict", "Bullet Time", "Bonds of Strength", "Tactical Retreat", "Black Rose Dignitary", "Rally the Troops", "Vanguard Captain", "Cithria of Cloudfield"],bfs:["Star Spring", "Forgotten Monument", "Hall of Legends"],runes:["Body", "Body", "Body", "Body", "Body", "Body", "Order", "Order", "Order", "Order", "Order", "Order"]},
"Darius (Fury/Order)":{legend:"Hand of Noxus",champ:"Darius, Trifarian",deck:["Unsung Hero", "Carrion Dredger", "Gem Jammer", "Shen, Kinkou", "Sharkling", "Prepared Neophyte", "Legion Rearguard", "Soaring Scout", "Vi, Destructive", "LeBlanc, Fragmented", "Kai'Sa, Survivor", "Solari Chief", "Red Brambleback", "Minotaur Reckoner", "Safety Inspector", "Blazing Scorcher", "Laurent Duelist", "Draven, Showboat", "Armed Assailant", "Inviolus Vox", "Eminent Benefactor", "Brazen Buccaneer", "Piercing Light", "Heroic Charge", "Smite", "Imperial Decree", "Call to Glory", "Square Up", "Void Seeker", "Icathian Rain", "Danger Zone", "Facebreaker", "Sudden Storm", "Blood Money", "Firestorm", "Sacrifice", "Faithful Manufactor", "Drag Under", "Poppy, Defender of the Meek", "Prepared Neophyte"],bfs:["Navori Fighting Pit", "The Academy", "Minefield"],runes:["Fury", "Fury", "Fury", "Fury", "Fury", "Fury", "Order", "Order", "Order", "Order", "Order", "Order"]},
"Viktor (Mind/Order)":{legend:"Herald of the Arcane",champ:"Viktor, Innovator",deck:["Forecaster", "Blastcone Fae", "Trusty Ramhound", "Pit Crew", "Faithful Manufactor", "Icevale Archer", "Keeper of Masks", "Zaun Punk", "Eager Apprentice", "Honest Broker", "Rek'Sai, Swarm Queen", "Ashe, Focused", "Rumble, Scrapper", "Hwei, Brooding Painter", "Solari Chief", "Fate Weaver", "Albus Ferros", "Vanguard Sergeant", "Thousand-Tailed Watcher", "Commander Ledros", "Garen, Commander", "Kai'Sa, Evolutionary", "Divine Judgment", "Salvage", "Hidden Blade", "Undying Loyalty", "Time Warp", "Deathgrip", "Eclipse", "Soul Harvest", "King's Edict", "Wages of Pain", "Promising Future", "Rocket Barrage", "Drag Under", "Production Surge", "Lux, Crownguard", "Gearhead", "Gustwalker", "Teemo, Strategist"],bfs:["Veiled Temple", "Bandle Tree", "Dusk Rose Lab"],runes:["Mind", "Mind", "Mind", "Mind", "Mind", "Mind", "Order", "Order", "Order", "Order", "Order", "Order"]},
"Lux (Mind/Order)":{legend:"Lady of Luminosity - Starter",champ:"Lux, Crownguard",deck:["Diana, Lunari", "Black Rose Dignitary", "Loyal Poro", "Watchful Sentry", "Bubble Bot", "Pickpocket", "Zaun Punk", "Keeper of Masks", "Crimson Pigeons", "Blastcone Fae", "Renata Glasc, Mastermind", "Stalking Wolf", "Petty Officer", "Solari Chief", "Viktor, Leader", "Glasc Mixologist", "Jhin, Meticulous Killer", "Laurent Duelist", "Eminent Benefactor", "Poppy, Defender of the Meek", "Atakhan", "Harnessed Dragon", "Recruit the Vanguard", "Cull the Weak", "Frigid Touch", "Call to Glory", "Wages of Pain", "Bonds of Strength", "Falling Comet", "Deadly Flourish", "Production Surge", "Salvage", "Premonition", "Hostile Takeover", "Hidden Blade", "Siphon Power", "Keeper of Masks", "Soaring Scout", "Rek'Sai, Swarm Queen", "Trusty Ramhound"],bfs:["Ripper's Bay", "Sunken Temple", "The Grand Plaza"],runes:["Mind", "Mind", "Mind", "Mind", "Mind", "Mind", "Order", "Order", "Order", "Order", "Order", "Order"]},
"Jinx (Fury/Chaos)":{legend:"Loose Cannon",champ:"Jinx, Demolitionist",deck:["Loyal Pup", "Inferna", "Pyke, Dockside Butcher", "Noxus Saboteur", "Kog'Maw, Caustic", "Sinister Poro", "Overzealous Fan", "Pouty Poro", "Bewitching Spirit", "Windsinger", "Annie, Stubborn", "Maddened Marauder", "Red Brambleback", "Angler Beast", "Perched Grimwyrm", "Noxus Hopeful", "Kha'Zix, Mutating Horror", "Vayne, Hunter", "Maduli the Gatekeeper", "Inviolus Vox", "Tryndamere, Barbarian", "Yeti Brawler", "Rebuke", "Possession", "Temptation", "Void Rush", "Monster Harpoon", "Isolate", "Angle Shot", "Morbid Return", "Disintegrate", "Lunar Boon", "Vault Breaker", "Conscription", "Falling Star", "Piercing Light", "Flash", "Ezreal, Prodigy", "Scrapyard Champion", "Smite"],bfs:["Amateur Recital", "Sigil of the Storm", "Fortified Position"],runes:["Fury", "Fury", "Fury", "Fury", "Fury", "Fury", "Chaos", "Chaos", "Chaos", "Chaos", "Chaos", "Chaos"]},
"Rumble (Fury/Mind)":{legend:"Mechanized Menace",champ:"Rumble, Scrapper",deck:["Dangerous Duo", "Flame Chompers", "Ahri, Inquisitive", "Blastcone Fae", "Scorchclaw", "Sentinel Adept", "Lillia, Fae Fawn", "Icevale Archer", "Chemtech Enforcer", "Undying Legion", "Jayce, Man of Progress", "Perched Grimwyrm", "Darius, Trifarian", "Jeweled Colossus", "Kai'Sa, Survivor", "Viktor, Innovator", "Captain Farron", "Ava Achiever", "Revna the Lorekeeper", "Brazen Buccaneer", "Mega-Mech", "Raging Firebrand", "Hextech Ray", "Angle Shot", "Smoke and Mirrors", "Incinerate", "Time Warp", "Deadly Flourish", "Sky Splitter", "Wages of Pain", "Cleave", "Smoke Screen", "Smite", "Vault Breaker", "Bushwhack", "Stupefy", "Inviolus Vox", "Downstage Dramatics", "Katarina, Reckless", "Void Rush"],bfs:["Startipped Peak", "Dusk Rose Lab", "Abandoned Hall"],runes:["Fury", "Fury", "Fury", "Fury", "Fury", "Fury", "Mind", "Mind", "Mind", "Mind", "Mind", "Mind"]},
"Garen (Body/Order)":{legend:"Might of Demacia - Starter",champ:"Garen, Commander",deck:["Shen, Kinkou", "Veteran Poro", "Kinkou Initiate", "Soaring Scout", "Karthus, Eternal", "Gemhand Hunter", "Pit Rookie", "Kraken Hunter", "Trifarian Gloryseeker", "Loyal Poro", "Wily Newtfish", "Machine Evangel", "Miss Fortune, Captain", "Stalking Wolf", "Dune Drake", "Safety Inspector", "Wildclaw Shaman", "Azir, Sovereign", "Peak Guardian", "Poppy, Defender of the Meek", "Arachnoid Horror", "Ivern, Friend to All", "Guards!", "Riposte", "Shadow's Call", "Divine Judgment", "Grim Resolve", "Disposal Order", "Rally the Troops", "Void Assault", "Concentrate", "Salvage", "Sacrifice", "Back to Back", "Blast of Power", "Hidden Blade", "Show of Strength", "Sea Monkey", "Call to Glory", "Disposal Order"],bfs:["Abandoned Hall", "Rockfall Path", "The Academy"],runes:["Body", "Body", "Body", "Body", "Body", "Body", "Order", "Order", "Order", "Order", "Order", "Order"]},
"Vi (Fury/Order)":{legend:"Piltover Enforcer",champ:"Vi, Destructive",deck:["Pyke, Dockside Butcher", "Rengar, Pouncing", "Chemtech Enforcer", "Trusty Ramhound", "Vanguard Captain", "Noxian Drummer", "Legion Rearguard", "Eager Drakehound", "Shen, Kinkou", "Trifarian Gloryseeker", "Blazing Scorcher", "Cruel Patron", "Katarina, Reckless", "Jhin, Murderous Artist", "Soraka, Wanderer", "Draven, Showboat", "Vanguard Sergeant", "Lord Broadmane", "Armed Assailant", "Ivern, Friend to All", "Revna the Lorekeeper", "Kadregrin the Infernal", "Sudden Storm", "Hextech Ray", "Heroic Charge", "Square Up", "Super Mega Death Rocket!", "Shakedown", "Firestorm", "Sacrifice", "Lotus Trap", "Salvage", "Tactical Retreat", "Divine Judgment", "Drag Under", "Cull the Weak", "Rumble, Hotheaded", "Rek'Sai, Swarm Queen", "Flame Chompers", "Towering Pairofant"],bfs:["Reckoner's Arena", "Grove of the God-Willow", "Abandoned Hall"],runes:["Fury", "Fury", "Fury", "Fury", "Fury", "Fury", "Order", "Order", "Order", "Order", "Order", "Order"]},
"Yasuo (Calm/Chaos)":{legend:"Unforgiven",champ:"Yasuo, Remorseful",deck:["Apprentice Smith", "Enthusiastic Promoter", "Shadow", "Loyal Pup", "Black Market Broker", "Lonely Poro", "Treasure Hunter", "Traveling Merchant", "Insightful Investigator", "Overzealous Fan", "Crescent Guardian", "Sona, Harmonious", "Ornn, Blacksmith", "Diana, No Longer Human", "Lillia, Protector of Dreams", "Shadow Watcher", "Sivir, Mercenary", "Irelia, Fervent", "Needlessly Large Yordle", "Megatusk", "Beast Below", "Monch", "Stand United", "Star-Crossed", "Alpha Strike", "Combat Experience", "Meditation", "Desert's Call", "Tricksy Tentacles", "Acceptable Losses", "Lilting Lullaby", "Wind Wall", "Flurry of Feathers", "Whirlwind", "The Harrowing", "Fight or Flight", "Loyal Pup", "Invert Timelines", "Temptation", "Fox-Fire"],bfs:["Windswept Hillock", "Forgotten Monument", "The Academy"],runes:["Calm", "Calm", "Calm", "Calm", "Calm", "Calm", "Chaos", "Chaos", "Chaos", "Chaos", "Chaos", "Chaos"]},
"Master Yi (Calm/Body)":{legend:"Wuju Bladesman - Starter",champ:"Master Yi, Tempered",deck:["Buhru Captain", "Mosstomper", "Cithria of Cloudfield", "Determined Sentry", "Veteran Poro", "Pit Rookie", "Nidalee, Cat Form", "Nami, Headstrong", "Sea Monkey", "Legion Quartermaster", "Simian Ancestor", "Combat Chef", "Ornn, Blacksmith", "Kato the Arm", "Irelia, Fervent", "Dauntless Vanguard", "Sett, Brawler", "Jax, Unrelenting", "Volibear, Imposing", "Ruin Runner", "Tasty Faefolk", "Mageseeker Warden", "Mobilize", "Bullet Time", "On the Hunt", "Block", "Riposte", "Confront", "Lilting Lullaby", "Highlander", "Unyielding Spirit", "Find Your Center", "Desert's Call", "Double Trouble", "Feral Strength", "Show of Strength", "Adaptatron", "Cannon Barrage", "Mobilize", "Vilemaw"],bfs:["Minefield", "Rockfall Path", "Forge of the Fluft"],runes:["Calm", "Calm", "Calm", "Calm", "Calm", "Calm", "Body", "Body", "Body", "Body", "Body", "Body"]},
};


var DNAMES = Object.keys(DECKS).sort();

var findCard = function(n) { return DB.find(function(c) { return c.n === n; }); };
var uid = function() { return Math.random().toString(36).slice(2, 9); };
var shuffle = function(a) { var b = a.slice(); for (var i = b.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = b[i]; b[i] = b[j]; b[j] = t; } return b; };
var mkC = function(n) {
  var c = findCard(n);
  if (!c) return null;
  return { name: c.n, type: c.t, domain: c.d, domains: c.ds, energy: c.e, might: c.m, keywords: c.kw, text: c.tx, img: CI[c.n] || null, uid: uid(), exhausted: false, damage: 0, tempMight: 0, stunned: false };
};

function Card({ card, onClick, selected, small, faceDown, inHand, zoomed }) {
  if (!card || (!card.domain && !faceDown)) return null;
  var d = DOM[card.domain] || DOM.Colorless;
  var w = small ? 100 : zoomed ? 374 : 187;
  var h = small ? 140 : zoomed ? 524 : 262;
  var ex = card.exhausted && !zoomed;
  var buff = card.tempMight || 0;

  if (faceDown) return (
    <div onClick={onClick} style={{ width: small ? 55 : 68, height: small ? 77 : 95, borderRadius: 4, background: "linear-gradient(160deg,#1b1b42,#1a1f3a)", border: "2px solid #252550", cursor: onClick ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#35357044" }} />
    </div>
  );

  if (card.type === "Rune") {
    var runeUrl = card.img ? imgSrc(card.img) : "";
    var rw = small ? 40 : zoomed ? 90 : w;
    var rh = small ? 56 : zoomed ? 126 : h;
    var ex2 = card.exhausted && !zoomed;
    return (
      <div className={zoomed ? "" : "card-hover"} onClick={onClick} style={{ width: rw, height: rh, borderRadius: small ? 3 : 6, overflow: "hidden", flexShrink: 0, border: "2px solid " + (selected ? "#FFD700" : ex2 ? "#111118" : d.c + "55"), cursor: onClick ? "pointer" : "default", opacity: ex2 ? 0.35 : 1, boxShadow: selected ? "0 0 12px #FFD700" : "none", background: "#0c0c18", transition: "transform 0.15s ease" }}>
        {runeUrl ? <img src={runeUrl} alt={card.name} style={{ width: "100%", height: "100%", objectFit: "fill", display: "block" }} /> : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "radial-gradient(circle at 35% 35%," + d.c + "cc," + d.c + "44)" }}><span style={{ fontSize: rw * 0.4 }}>{d.i}</span></div>}
      </div>
    );
  }

  /* Resolve image URL from CI hash map */
  var imgUrl = card.img ? imgSrc(card.img) : "";
  var borderColor = selected ? "#FFD700" : ex ? "#DC262688" : (d.c + "55");
  var shadow = (selected || zoomed) ? "0 0 20px #FFD70055" : inHand ? "0 4px 16px #000b" : "0 2px 8px #00000055";
  var isUnit = card.type === "Unit" || card.type === "Champion";
  var wrapS = { width: w, height: h, borderRadius: zoomed ? 10 : small ? 4 : 6, overflow: "hidden", flexShrink: 0, position: "relative", border: (zoomed ? 3 : 2) + "px solid " + borderColor, boxShadow: shadow, cursor: onClick ? "pointer" : "default", opacity: ex ? 0.5 : 1, background: "#0c0c18", transition: "transform 0.15s ease" };
  var hCls = zoomed ? "" : "card-hover";

  /* Cards with real CDN image */
  if (imgUrl) {
    return (
      <div className={hCls} onClick={onClick} style={wrapS}>
        <img src={imgUrl} alt={card.name} style={{ width: "100%", height: "100%", objectFit: "fill", display: "block" }} onError={function(e) { if (PA[card.name] && e.target.src.indexOf("piltover") < 0) { e.target.src = PA_CDN + PA[card.name] + ".webp"; } else { e.target.style.display = "none"; } }} />
        {buff > 0 && <div style={{ position: "absolute", bottom: zoomed ? 8 : 3, left: zoomed ? 8 : 3, background: "#16A34Aee", color: "#fff", borderRadius: 20, padding: zoomed ? "2px 10px" : "0 4px", fontSize: zoomed ? 17 : small ? 7 : 9, fontWeight: 800, boxShadow: "0 2px 6px #000a", border: "1px solid #fff3" }}>+{buff}</div>}
        {card.damage > 0 && <div style={{ position: "absolute", bottom: zoomed ? 8 : 3, right: zoomed ? 8 : 3, background: "#DC2626ee", color: "#fff", borderRadius: 20, padding: zoomed ? "2px 10px" : "0 4px", fontSize: zoomed ? 17 : small ? 7 : 9, fontWeight: 800, boxShadow: "0 2px 6px #000a", border: "1px solid #fff3" }}>-{card.damage}</div>}
        {card.stunned && <div style={{ position: "absolute", inset: 0, background: "#000a", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#FFD700", fontSize: zoomed ? 18 : 10, fontWeight: 800, background: "#000c", padding: "2px 8px", borderRadius: 6, border: "1px solid #FFD70066" }}>STUNNED</span></div>}
        {ex && !card.stunned && <div style={{ position: "absolute", inset: 0, background: "#0008", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#888", fontSize: zoomed ? 16 : 10, fontWeight: 800, background: "#000c", padding: "2px 8px", borderRadius: 6, border: "1px solid #ffffff2a" }}>TAPPED</span></div>}
      </div>
    );
  }

  /* Card template for cards without CDN image - styled like real Riftbound */
  var fn = small ? 7 : zoomed ? 16 : inHand ? 10 : 8.5;
  var ft = small ? 6 : zoomed ? 12 : inHand ? 8 : 7;
  var fo = small ? 15 : zoomed ? 32 : inHand ? 19 : 17;
  return (
    <div className={hCls} onClick={onClick} style={Object.assign({}, wrapS, { display: "flex", flexDirection: "column", background: "linear-gradient(180deg," + d.c + "12,#0a0a16 20%,#08081a 80%," + d.c + "08)" })}>
      {/* Art area */}
      <div style={{ height: "45%", position: "relative", background: "linear-gradient(160deg," + d.c + "25,#0c0c1a 50%," + d.c + "10)", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid " + d.c + "33", flexShrink: 0 }}>
        <span style={{ fontSize: h * 0.22, opacity: 0.15 }}>{d.i}</span>
        {/* Energy orb */}
        {card.energy >= 0 && card.type !== "Battlefield" && card.type !== "Legend" && (
          <div style={{ position: "absolute", top: small ? 2 : 4, left: small ? 2 : 4, width: fo, height: fo, borderRadius: "50%", background: "radial-gradient(circle at 35% 35%,#2a2a48,#0a0a18)", border: "1.5px solid " + d.c + "88", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 4px #000a" }}>
            <span style={{ color: "#F5C842", fontSize: fo * 0.55, fontWeight: 900 }}>{card.energy}</span>
          </div>
        )}
        {/* Might orb */}
        {isUnit && (
          <div style={{ position: "absolute", top: small ? 2 : 4, right: small ? 2 : 4, width: fo, height: fo, borderRadius: "50%", background: "radial-gradient(circle at 35% 35%," + d.c + "," + d.c + "88)", border: "1.5px solid #ffffff33", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 4px #000a" }}>
            <span style={{ color: "#fff", fontSize: fo * 0.55, fontWeight: 900 }}>{card.might || 0}</span>
          </div>
        )}
      </div>
      {/* Name plate */}
      <div style={{ background: "linear-gradient(90deg," + d.c + "cc," + d.c + "77)", padding: small ? "1px 3px" : zoomed ? "4px 10px" : "2px 5px", flexShrink: 0 }}>
        <div style={{ color: "#fff", fontSize: fn, fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textShadow: "0 1px 2px #000" }}>{card.name}</div>
      </div>
      {/* Type + keywords */}
      <div style={{ padding: small ? "0 3px" : "1px 5px", fontSize: ft * 0.85, color: "#777", display: "flex", justifyContent: "space-between", borderBottom: "1px solid " + d.c + "15", flexShrink: 0, background: "#0a0a14" }}>
        <span>{card.type}</span>
        {card.keywords && card.keywords.length > 0 && <span style={{ color: d.c, fontWeight: 600 }}>{card.keywords.join(" ")}</span>}
      </div>
      {/* Text box */}
      <div style={{ flex: 1, padding: small ? "1px 3px" : zoomed ? "6px 12px" : "2px 5px", fontSize: ft, color: "#bbb", lineHeight: 1.2, overflow: "hidden", background: "#090914" }}>{card.text || ""}</div>
      {/* Bottom accent */}
      <div style={{ height: 2, background: d.c + "44", flexShrink: 0 }} />
      {/* Chips */}
      {buff > 0 && <div style={{ position: "absolute", bottom: 3, left: 3, background: "#16A34Aee", color: "#fff", borderRadius: 20, padding: "0 4px", fontSize: small ? 7 : 9, fontWeight: 800 }}>+{buff}</div>}
      {card.damage > 0 && <div style={{ position: "absolute", bottom: 3, right: 3, background: "#DC2626ee", color: "#fff", borderRadius: 20, padding: "0 4px", fontSize: small ? 7 : 9, fontWeight: 800 }}>-{card.damage}</div>}
      {card.stunned && <div style={{ position: "absolute", inset: 0, background: "#000a", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#FFD700", fontSize: 10, fontWeight: 800, background: "#000c", padding: "2px 8px", borderRadius: 6 }}>STUNNED</span></div>}
    </div>
  );
}



function initPlayer(dk) {
  var t = DECKS[dk];
  var legend = mkC(t.legend);
  var champion = mkC(t.champ);
  var mainDeck = shuffle(t.deck).map(mkC).filter(Boolean);
  var hand = mainDeck.splice(0, 4);
  var runeDeck = shuffle(t.runes).map(function(d) { var rName = d + " Rune"; return { uid: uid(), domain: d, exhausted: false, name: rName, type: "Rune", img: CI[rName] || null }; });
  var battlefields = t.bfs.map(mkC).filter(Boolean);
  return { legend: legend, champion: champion, championPlayed: false, mainDeck: mainDeck, runeDeck: runeDeck, hand: hand, base: [], runes: [], trash: [], score: 0, battlefields: battlefields, dn: dk, chosenBf: null };
}

export default function RiftboundGame() {
  var _s = useState("mode"), screen = _s[0], setScreen = _s[1];
  var _pc = useState(2), pc = _pc[0], setPc = _pc[1];
  var _t = useState(1), turn = _t[0], setTurn = _t[1];
  var _a = useState(0), act = _a[0], setAct = _a[1];
  var _ps = useState([]), ps = _ps[0], setPs = _ps[1];
  var _bfs = useState([]), bfs = _bfs[0], setBfs = _bfs[1];
  var _sel = useState(null), sel = _sel[0], setSel = _sel[1];
  var _log = useState([]), log = _log[0], setLog = _log[1];
  var _mc = useState([]), mc = _mc[0], setMc = _mc[1];
  var _dp = useState({}), dp = _dp[0], setDp = _dp[1];
  var _tm = useState(null), tm = _tm[0], setTm = _tm[1];
  var _win = useState(null), win = _win[0], setWin = _win[1];
  var _fc = useState(null), fc = _fc[0], setFc = _fc[1];
  var _tr = useState([]), tr = _tr[0], setTr = _tr[1];
  var _zoom = useState(null), zoom = _zoom[0], setZoom = _zoom[1];
  var _sd = useState(null), sd = _sd[0], setSd = _sd[1];
  var _ap = useState(null), awakenPhase = _ap[0], setAwakenPhase = _ap[1];
  var _anim = useState([]), anims = _anim[0], setAnims = _anim[1];
  var _sbf = useState(null), selectedBf = _sbf[0], setSelectedBf = _sbf[1];
  var _du = useState(null), dragUnit = _du[0], setDragUnit = _du[1];
  var lr = useRef(null);
  var aL = useCallback(function(m) { setLog(function(p) { return p.slice(-60).concat([{ m: m }]); }); }, []);
  useEffect(function() { if (lr.current) lr.current.scrollTop = lr.current.scrollHeight; }, [log]);

  var cur = ps[act] || null;
  var numBfs = pc === 2 ? 2 : 3;

  function resetAll() {
    setScreen("mode"); setPs([]); setBfs([]); setTurn(1); setAct(0); setWin(null);
    setLog([]); setDp({}); setSel(null); setTm(null); setFc(null); setTr([]);
    setZoom(null); setSd(null); setPc(2); setMc([]);
  }

  // Simplified game - just renders a working app
  if (screen === "mode") return (
    <div style={{ minHeight: "100vh", background: "#080818", color: "#ddd", fontFamily: "sans-serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24 }}>
      <h1 style={{ fontSize: 52, letterSpacing: 6, fontFamily: "Cinzel,serif", fontWeight: 900, background: "linear-gradient(135deg,#FFD700,#FF8C00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>RIFTBOUND</h1>
      <p style={{ color: "#666", fontSize: 16, marginTop: -12 }}>League of Legends TCG</p>
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", marginTop: 8 }}>
        {[{name:"Normal",sub:"1v1",pc:2},{name:"3 Player",sub:"1v1v1",pc:3},{name:"4 Player",sub:"1v1v1v1",pc:4},{name:"Doubles",sub:"2v2",pc:4}].map(function(mode) {
          return <button key={mode.name} onClick={function() { setPc(mode.pc); setScreen("deck"); }} style={{ padding: "18px 32px", borderRadius: 8, border: "2px solid #FFD70066", background: "#FFD70010", color: "#FFD700", cursor: "pointer", fontSize: 20, fontWeight: 800, minWidth: 140, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}><span>{mode.name}</span><span style={{ fontSize: 12, fontWeight: 400, color: "#FFD700aa" }}>{mode.sub}</span></button>;
        })}
      </div>
    </div>
  );

  if (screen === "pc") { setScreen("deck"); return null; }

  if (screen === "deck") {
    var allPicked = Object.keys(dp).length === pc;
    return (
      <div style={{ minHeight: "100vh", background: "#080818", color: "#ddd", fontFamily: "sans-serif", display: "flex", flexDirection: "column", alignItems: "center", padding: 20, overflow: "auto" }}>
        <h2 style={{ marginBottom: 16, fontSize: 28, fontFamily: "Cinzel,serif", fontWeight: 900, background: "linear-gradient(135deg,#FFD700,#FF8C00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>SELECT DECKS</h2>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
          {Array.from({ length: pc }, function(_, pi) {
            return (
              <div key={pi} style={{ minWidth: 260 }}>
                <h3 style={{ color: "#FFD700", fontSize: 16, textAlign: "center", marginBottom: 8 }}>PLAYER {pi + 1}</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
                  {DNAMES.map(function(n) {
                    var s = dp[pi] === n;
                    var t = DECKS[n];
                    var lg = findCard(t.legend);
                    var ds = (lg && lg.ds) ? lg.ds : [];
                    return (
                      <button key={n} onClick={function() { setDp(Object.assign({}, dp, { [pi]: n })); }} style={{ padding: "8px 10px", borderRadius: 5, border: s ? "2px solid #FFD700" : "1px solid #2a2a3a", background: s ? "#FFD70015" : "#0c0c1a", color: s ? "#FFD700" : "#aaa", cursor: "pointer", textAlign: "left", fontSize: 13 }}>
                        <div style={{ fontWeight: s ? 700 : 500 }}>{n}</div>
                        <div style={{ fontSize: 11, marginTop: 3, display: "flex", gap: 6 }}>{ds.map(function(dd) { var dc = DOM[dd] || DOM.Colorless; return <span key={dd} style={{ color: dc.c, fontWeight: 700 }}>{dc.i} {dd}</span>; })}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <button onClick={function() { if (allPicked) { var nps = []; for (var i = 0; i < pc; i++) nps.push(initPlayer(dp[i])); setPs(nps); setScreen("bf"); setAct(0); aL("Choose Battlefields!"); } }} disabled={!allPicked} style={{ marginTop: 20, padding: "14px 36px", borderRadius: 8, border: "2px solid #FFD700", background: allPicked ? "#FFD70040" : "#222", color: allPicked ? "#FFD700" : "#555", cursor: allPicked ? "pointer" : "not-allowed", fontSize: 18, fontWeight: 800, fontFamily: "Cinzel,serif" }}>BATTLE</button>
      </div>
    );
  }

  if (screen === "bf" && ps[act]) return (
    <div style={{ minHeight: "100vh", background: "#080818", color: "#ddd", fontFamily: "sans-serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
      <h2 style={{ fontSize: 26, fontFamily: "Cinzel,serif", fontWeight: 900, background: "linear-gradient(135deg,#FFD700,#FF8C00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>P{act + 1} - Choose Battlefield</h2>
      <p style={{ color: "#888", fontSize: 13 }}>Select a battlefield to bring into the game</p>
      <div style={{ display: "flex", gap: 16 }}>
        {ps[act].battlefields.map(function(bf) {
          var bfHash = CI[bf.name] || (PA[bf.name] ? PA_CDN + PA[bf.name] + ".webp" : null);
          var bfUrl = bfHash ? imgSrc(bfHash) : "";
          var isSelected = selectedBf && selectedBf.uid === bf.uid;
          var isPA = bfUrl.indexOf("piltover") > -1;
          return (
            <div key={bf.uid} onClick={function() { setSelectedBf(isSelected ? null : bf); }} style={{ padding: 0, border: "3px solid " + (isSelected ? "#FFD700" : "#FFD70044"), borderRadius: 8, background: "#0c0c1a", cursor: "pointer", width: 428, height: 306, overflow: "hidden", boxShadow: isSelected ? "0 0 20px #FFD70044" : "none", opacity: selectedBf && !isSelected ? 0.5 : 1, transition: "opacity 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease", position: "relative" }}>
              {bfUrl ? <img src={bfUrl} alt={bf.name} style={isPA ? { position: "absolute", top: "50%", left: "50%", width: 306, height: 428, objectFit: "cover", transform: "translate(-50%,-50%) rotate(90deg)" } : { width: "100%", height: "100%", objectFit: "cover", display: "block" }} /> : <div style={{ width: "100%", height: "100%", background: "linear-gradient(160deg,#1a1a3a,#0a0a1a)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 6 }}><span style={{ fontSize: 32, opacity: 0.2 }}>⚔</span><span style={{ color: "#FFD700", fontSize: 14, fontWeight: 700 }}>{bf.name}</span></div>}
            </div>
          );
        })}
      </div>
      {selectedBf && <p style={{ color: "#FFD700", fontSize: 14, fontFamily: "Cinzel,serif" }}>{selectedBf.name}</p>}
      <button onClick={function() {
        if (!selectedBf) return;
        var np = ps.map(function(p) { return Object.assign({}, p); });
        np[act].chosenBf = selectedBf; setPs(np);
        setSelectedBf(null);
        if (act < pc - 1) { setAct(act + 1); aL("P" + (act + 1) + " chose " + selectedBf.name); }
        else {
          var gb = np.map(function(p) { return p.chosenBf; }).filter(Boolean).slice(0, numBfs).map(function(b) { return Object.assign({}, b, { controller: null, units: Array.from({ length: pc }, function() { return []; }), uid: uid() }); });
          setBfs(gb); setAct(0); setScreen("mull"); aL("P1 mulligan.");
        }
      }} disabled={!selectedBf} style={{ padding: "12px 36px", borderRadius: 6, border: "2px solid " + (selectedBf ? "#FFD700" : "#333"), background: selectedBf ? "linear-gradient(135deg,#FFD70040,#FF8C0020)" : "#111", color: selectedBf ? "#FFD700" : "#555", cursor: selectedBf ? "pointer" : "not-allowed", fontSize: 16, fontWeight: 700, fontFamily: "Cinzel,serif", letterSpacing: 2 }}>CONFIRM</button>
    </div>
  );

  if (screen === "mull" && ps[act]) return (
    <div style={{ minHeight: "100vh", background: "#080818", color: "#ddd", fontFamily: "sans-serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
      <h2 style={{ fontSize: 28, fontFamily: "Cinzel,serif", fontWeight: 900, background: "linear-gradient(135deg,#FFD700,#FF8C00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>P{act + 1} Mulligan</h2>
      <p style={{ color: "#888", fontSize: 14 }}>Select up to 2 to replace</p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        {ps[act].hand.map(function(c) { return <Card key={c.uid} card={c} selected={mc.indexOf(c.uid) >= 0} onClick={function() { setMc(function(p) { return p.indexOf(c.uid) >= 0 ? p.filter(function(x) { return x !== c.uid; }) : p.length < 2 ? p.concat([c.uid]) : p; }); }} zoomed />; })}
      </div>
      <button onClick={function() {
        var p = Object.assign({}, ps[act], { hand: ps[act].hand.slice(), mainDeck: ps[act].mainDeck.slice() });
        if (mc.length > 0) {
          var kept = p.hand.filter(function(c) { return mc.indexOf(c.uid) < 0; });
          var disc = p.hand.filter(function(c) { return mc.indexOf(c.uid) >= 0; });
          p.mainDeck = shuffle(p.mainDeck.concat(disc));
          p.hand = kept.concat(p.mainDeck.splice(0, disc.length));
          aL("P" + (act + 1) + " mulls " + mc.length);
        } else { aL("P" + (act + 1) + " keeps."); }
        var np = ps.slice(); np[act] = p; setPs(np); setMc([]);
        if (act < pc - 1) { setAct(act + 1); aL("P" + (act + 2) + " mulligan."); }
        else { setAct(0); setScreen("wait"); setTurn(1); aL("Game on!"); }
      }} style={{ padding: "12px 28px", borderRadius: 6, border: "2px solid #FFD700", background: "#FFD70040", color: "#FFD700", cursor: "pointer", fontSize: 16, fontWeight: 700 }}>{mc.length > 0 ? "MULLIGAN " + mc.length : "KEEP"}</button>
    </div>
  );

  if (!cur) return <div style={{ minHeight: "100vh", background: "#080818", color: "#666", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading...</div>;

  // GAME BOARD
  var isSD = screen === "sd";
  var hasPri = isSD && sd && sd.priority === act;
  var canAct = screen === "play" || hasPri;

  function addAnim(id, type) { setAnims(function(prev) { return prev.concat([{ id: id, type: type, ts: Date.now() }]); }); setTimeout(function() { setAnims(function(prev) { return prev.filter(function(a) { return a.id !== id; }); }); }, 600); }

  function doStartTurn() {
    setAwakenPhase("untap"); aL("=== Turn " + turn + " P" + (act + 1) + " ===");
    setTimeout(function() {
      var p = Object.assign({}, cur, { runes: cur.runes.map(function(r) { return Object.assign({}, r, { exhausted: false }); }), base: cur.base.map(function(c) { return Object.assign({}, c, { exhausted: false, stunned: false }); }), legend: Object.assign({}, cur.legend, { exhausted: false }), runeDeck: cur.runeDeck.slice(), mainDeck: cur.mainDeck.slice(), hand: cur.hand.slice() });
      var nb = bfs.map(function(b) { return Object.assign({}, b, { units: b.units.map(function(pu, i) { return i === act ? pu.map(function(u) { return Object.assign({}, u, { exhausted: false, stunned: false, tempMight: 0 }); }) : pu.slice(); }) }); });
      var np1 = ps.slice(); np1[act] = p; setPs(np1); setBfs(nb);
      setAwakenPhase("score");
      setTimeout(function() {
        var sc = 0;
        nb.forEach(function(bf) { if (bf.controller === act && bf.units[act].length > 0) { var contested = false; for (var i = 0; i < pc; i++) { if (i !== act && bf.units[i].length > 0) contested = true; } if (!contested) sc++; } });
        if (sc > 0) { p.score += sc; aL("  Begin: +" + sc + " points! (" + p.score + "/8)"); } else { aL("  Begin: score unchanged"); }
        if (p.score >= 8) { setWin(act); setScreen("go"); aL("P" + (act + 1) + " wins!"); var npW = ps.slice(); npW[act] = p; setPs(npW); setBfs(nb); setAwakenPhase(null); return; }
        var np2 = ps.slice(); np2[act] = p; setPs(np2);
        setAwakenPhase("channel");
        setTimeout(function() {
          var nr = turn === 1 && act === 1 ? 3 : 2;
          var ch = p.runeDeck.splice(0, Math.min(nr, p.runeDeck.length));
          p.runes = p.runes.concat(ch);
          ch.forEach(function(r) { addAnim(r.uid, "draw"); });
          aL("  Channel: " + ch.length + " runes");
          var np3 = ps.slice(); np3[act] = p; setPs(np3);
          setAwakenPhase("draw");
          setTimeout(function() {
            if (p.mainDeck.length > 0) { var drawn = p.mainDeck.shift(); p.hand = p.hand.concat([drawn]); addAnim(drawn.uid, "draw"); aL("  Draw: 1 card"); }
            var np4 = ps.slice(); np4[act] = p; setPs(np4);
            setAwakenPhase(null); setScreen("play");
          }, 700);
        }, 1050);
      }, 1050);
    }, 1050);
  }

  function endTurn() {
    var nb = bfs.map(function(b) { return Object.assign({}, b, { units: b.units.map(function(pu) { return pu.map(function(u) { return Object.assign({}, u, { tempMight: 0, damage: 0 }); }); }) }); });
    var p2 = Object.assign({}, cur, { base: cur.base.map(function(c) { return Object.assign({}, c, { tempMight: 0, damage: 0 }); }) });
    var np = ps.slice(); np[act] = p2; setPs(np); setBfs(nb);
    var nx = (act + 1) % pc; setAct(nx); if (nx === 0) setTurn(turn + 1);
    setSel(null); setTm(null); setFc(null); setTr([]); setSd(null);
    setScreen("wait"); aL("P" + (nx + 1) + " start turn.");
  }

  function openPlay(card) { if (tm || fc) return; if (isSD && card.type !== "Spell") { aL("Only Spells during showdown!"); return; } var avail = cur.runes.filter(function(r) { return !r.exhausted; }); var energy = card.energy; var byDom = {}; avail.forEach(function(r) { if (!byDom[r.domain]) byDom[r.domain] = []; byDom[r.domain].push(r); }); var doms = Object.keys(byDom); var picked = []; if (energy > 0 && doms.length > 0) { var per = Math.floor(energy / doms.length); var rem = energy % doms.length; doms.forEach(function(dom, i) { var cnt = per + (i < rem ? 1 : 0); picked = picked.concat(byDom[dom].slice(0, cnt)); }); if (picked.length < energy) { avail.forEach(function(r) { if (picked.length >= energy) return; if (picked.indexOf(r) < 0) picked.push(r); }); } } setFc(card); setTr(picked.slice(0, energy).map(function(r) { return r.uid; })); }

  function confirmPlay() {
    if (!fc || (tr.length < fc.energy && fc.energy > 0)) return;
    var isChamp = cur.champion && fc.uid === cur.champion.uid;
    var p = Object.assign({}, cur, { runes: cur.runes.map(function(r) { return tr.indexOf(r.uid) >= 0 ? Object.assign({}, r, { exhausted: true }) : r; }), hand: cur.hand.filter(function(c) { return c.uid !== fc.uid; }) });
    var card = fc;
    if (card.type === "Unit" || card.type === "Champion") {
      p.base = p.base.concat([Object.assign({}, card, { exhausted: true })]);
      if (isChamp) p.championPlayed = true;
      aL("P" + (act + 1) + " plays " + card.name);
      if (/draw 1/i.test(card.text) && p.mainDeck.length > 0) { p.hand = p.hand.concat([p.mainDeck.shift()]); aL("  Draw 1"); }
      if (/draw 2/i.test(card.text)) { var d = p.mainDeck.splice(0, Math.min(2, p.mainDeck.length)); p.hand = p.hand.concat(d); }
    } else if (card.type === "Spell") {
      p.trash = (p.trash || []).concat([card]); aL("P" + (act + 1) + " casts " + card.name);
      if (/Draw 2 cards/i.test(card.text)) { var d2 = p.mainDeck.splice(0, 2); p.hand = p.hand.concat(d2); }
      if (/\+2 Might/i.test(card.text)) setTm({ ty: "buff", v: 2 });
      else if (/\+3 Might/i.test(card.text)) setTm({ ty: "buff", v: 3 });
      else if (/Deal 3/i.test(card.text)) setTm({ ty: "dmg", v: 3 });
      else if (/Deal 2/i.test(card.text)) setTm({ ty: "dmg", v: 2 });
      else if (/Stun/i.test(card.text)) setTm({ ty: "stun" });
    }
    var np = ps.slice(); np[act] = p; setPs(np); setFc(null); setTr([]);
    if (sd) setSd(Object.assign({}, sd, { acted: true, lastPass: null }));
  }

  function resTarget(u, pi, bi) {
    if (!tm) return;
    var nb = bfs.map(function(b) { return Object.assign({}, b, { units: b.units.map(function(x) { return x.slice(); }) }); });
    var np = ps.map(function(p) { return Object.assign({}, p, { base: p.base.slice(), trash: (p.trash || []).slice(), hand: p.hand.slice() }); });
    var arr = bi !== null ? nb[bi].units[pi] : np[pi].base;
    var idx = arr.findIndex(function(x) { return x.uid === u.uid; });
    if (idx < 0) { setTm(null); return; }
    var target = arr[idx];
    if (tm.ty === "buff" && pi === act) { target.tempMight = (target.tempMight || 0) + tm.v; aL("  " + target.name + " +" + tm.v + "M!"); }
    else if (tm.ty === "dmg") { target.damage = (target.damage || 0) + tm.v; if (target.damage >= (target.might || 0) + (target.tempMight || 0)) { aL("  " + target.name + " killed!"); np[pi].trash.push(target); arr.splice(idx, 1); } else { aL("  " + target.name + " takes " + tm.v); } }
    else if (tm.ty === "stun" && pi !== act) { target.stunned = true; aL("  " + target.name + " stunned!"); }
    setBfs(nb); setPs(np); setTm(null);
  }



  function playChampionToBase() {
    if (!canAct || !cur.champion || cur.championPlayed) return;
    var np = ps.slice();
    var p = Object.assign({}, cur, { championPlayed: true, base: cur.base.concat([Object.assign({}, cur.champion, { exhausted: true })]) });
    np[act] = p; setPs(np);
    aL("P" + (act + 1) + " plays " + cur.champion.name + " to base.");
  }

  function moveUnit(uUid, bi) {
    if (!canAct) return;
    var p = Object.assign({}, cur, { base: cur.base.slice() });
    var nb = bfs.map(function(b) { return Object.assign({}, b, { units: b.units.map(function(x) { return x.slice(); }) }); });
    var idx = p.base.findIndex(function(u) { return u.uid === uUid; });
    if (idx < 0) return;
    var unit = p.base[idx];
    if (unit.exhausted) { aL("Exhausted!"); return; }
    p.base.splice(idx, 1);
    nb[bi].units[act].push(Object.assign({}, unit, { exhausted: true }));
    aL("P" + (act + 1) + " moves " + unit.name + " to " + nb[bi].name);
    var np = ps.slice(); np[act] = p; setPs(np); setBfs(nb); setSel(null);
    var hasEnemies = false;
    for (var j = 0; j < pc; j++) { if (j !== act && nb[bi].units[j].length > 0) hasEnemies = true; }
    if (hasEnemies && !sd) {
      aL("SHOWDOWN at " + nb[bi].name + "!");
      setSd({ bfIdx: bi, atkIdx: act, priority: act, lastPass: null, acted: false });
      setScreen("sd");
    } else if (!hasEnemies && !sd && nb[bi].controller !== act) {
      nb[bi].controller = act; p.score++;
      aL("Conquered! (" + p.score + "/8)");
      if (p.score >= 8) { setWin(act); setScreen("go"); }
      else if (p.mainDeck.length > 0) { p.hand = p.hand.concat([p.mainDeck.shift()]); aL("  Draw 1"); }
      np[act] = p; setPs(np); setBfs(nb);
    }
  }

  function passPriority() {
    if (!sd) return;
    if (sd.lastPass !== null && sd.lastPass !== sd.priority && !sd.acted) {
      aL("Both pass. Combat!");
      // Resolve combat (simplified)
      var bi = sd.bfIdx;
      var nb = bfs.map(function(b) { return Object.assign({}, b, { units: b.units.map(function(x) { return x.slice(); }) }); });
      var np = ps.map(function(p) { return Object.assign({}, p, { trash: (p.trash||[]).slice(), hand: p.hand.slice(), mainDeck: p.mainDeck.slice() }); });
      var atkM = 0; nb[bi].units[sd.atkIdx].forEach(function(u) { if (u.stunned) return; var m = (u.might||0)+(u.tempMight||0); (u.keywords||[]).forEach(function(k) { if (k.indexOf("Assault")===0) m += parseInt(k.split(" ")[1])||1; }); atkM += m; });
      var defM = 0; var enemies = []; for (var j = 0; j < pc; j++) { if (j !== sd.atkIdx && nb[bi].units[j].length > 0) enemies.push(j); }
      enemies.forEach(function(ei) { nb[bi].units[ei].forEach(function(u) { if (u.stunned) return; var m = (u.might||0)+(u.tempMight||0); (u.keywords||[]).forEach(function(k) { if (k==="Shield"||k.indexOf("Shield")===0) m += parseInt(k.split(" ")[1])||1; }); defM += m; }); });
      aL("  Atk " + atkM + " vs Def " + defM);
      // Simple kill logic
      var atkDead = []; var defDead = [];
      var remA = atkM; enemies.forEach(function(ei) { nb[bi].units[ei].forEach(function(u) { if (remA <= 0) return; var m = (u.might||0)+(u.tempMight||0); if (remA >= m) { remA -= m; defDead.push(u.uid); aL("  " + u.name + " destroyed!"); } }); });
      var remD = defM; nb[bi].units[sd.atkIdx].forEach(function(u) { if (remD <= 0) return; var m = (u.might||0)+(u.tempMight||0); if (remD >= m) { remD -= m; atkDead.push(u.uid); aL("  " + u.name + " destroyed!"); } });
      enemies.forEach(function(ei) { np[ei].trash = np[ei].trash.concat(nb[bi].units[ei].filter(function(u) { return defDead.indexOf(u.uid)>=0; })); nb[bi].units[ei] = nb[bi].units[ei].filter(function(u) { return defDead.indexOf(u.uid)<0; }); });
      np[sd.atkIdx].trash = np[sd.atkIdx].trash.concat(nb[bi].units[sd.atkIdx].filter(function(u) { return atkDead.indexOf(u.uid)>=0; }));
      nb[bi].units[sd.atkIdx] = nb[bi].units[sd.atkIdx].filter(function(u) { return atkDead.indexOf(u.uid)<0; });
      var anyE = enemies.some(function(ei) { return nb[bi].units[ei].length > 0; });
      if (nb[bi].units[sd.atkIdx].length > 0 && !anyE) {
        nb[bi].controller = sd.atkIdx; np[sd.atkIdx].score++;
        aL("Conquered! (" + np[sd.atkIdx].score + "/8)");
        if (np[sd.atkIdx].score >= 8) { setWin(sd.atkIdx); setScreen("go"); }
        else if (np[sd.atkIdx].mainDeck.length > 0) { np[sd.atkIdx].hand = np[sd.atkIdx].hand.concat([np[sd.atkIdx].mainDeck.shift()]); }
      }
      setBfs(nb); setPs(np); setSd(null); setScreen("play"); setAct(sd.atkIdx);
    } else {
      var bi2 = sd.bfIdx;
      var involved = [sd.atkIdx];
      for (var j2 = 0; j2 < pc; j2++) { if (j2 !== sd.atkIdx && bfs[bi2] && bfs[bi2].units[j2] && bfs[bi2].units[j2].length > 0) involved.push(j2); }
      var ci = involved.indexOf(sd.priority);
      var nextP = involved[(ci + 1) % involved.length];
      aL("P" + (sd.priority + 1) + " passes -> P" + (nextP + 1));
      setSd(Object.assign({}, sd, { priority: nextP, lastPass: sd.priority, acted: false }));
      setAct(nextP);
    }
  }
  var RUNE_W = 65, RUNE_H = 91;
  var HAND_W = 100, HAND_H = 140;
  var LEGEND_W = 80, LEGEND_H = 112;
  var BF_W = 120, BF_H = 86;
  var canPlayCard = function(c) { return isSD ? c.type === "Spell" : true; };
  var hasAnim = function(id) { return anims.some(function(a) { return a.id === id; }); };

  function CardBack(props) {
    var w = props.w || RUNE_W; var h = props.h || RUNE_H; var count = props.count; var label = props.label;
    return React.createElement("div", { style: { width: w, height: h, borderRadius: 5, background: "linear-gradient(160deg,#1a1535,#0f1028)", border: "2px solid #FFD70045", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0, position: "relative", overflow: "hidden" } },
      React.createElement("div", { style: { position: "absolute", inset: 3, border: "1px solid #FFD70040", borderRadius: 3 } }),
      React.createElement("div", { style: { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "60%", height: "60%", border: "1px solid #FFD70010", borderRadius: "50%" } }),
      React.createElement("span", { style: { fontSize: Math.max(16, w * 0.28), fontWeight: 900, color: "#FFD700", fontFamily: "Cinzel,serif", zIndex: 1, textShadow: "0 2px 8px #000" } }, count),
      React.createElement("span", { style: { fontSize: 7, color: "#FFD70066", fontFamily: "Cinzel,serif", letterSpacing: 2, zIndex: 1, marginTop: 2 } }, label)
    );
  }

  function BinPile(props) {
    var trash = props.trash || [];
    return React.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 1, flexShrink: 0 } },
      React.createElement("div", { style: { width: 40, height: 56, borderRadius: 4, background: "#0a0a18", border: "1px solid #ffffff2a", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" } },
        trash.length > 0 && trash[trash.length - 1].img ? React.createElement("img", { src: imgSrc(trash[trash.length - 1].img), style: { width: "100%", height: "100%", objectFit: "fill", opacity: 0.5 } }) : React.createElement("span", { style: { fontSize: 14, color: "#ffffff2a" } }, "\u2620"),
        React.createElement("div", { style: { position: "absolute", bottom: 1, right: 2, fontSize: 9, fontWeight: 700, color: "#666", textShadow: "0 1px 2px #000" } }, trash.length)
      ),
      React.createElement("span", { style: { fontSize: 6, color: "#333", fontFamily: "Cinzel,serif", letterSpacing: 1 } }, "BIN")
    );
  }

  function FannedHand(props) {
    var hand = props.hand; var isEnemy = props.isEnemy; var onPlay = props.onPlay; var onZoom = props.onZoom;
    var total = hand.length; var mid = (total - 1) / 2;
    return React.createElement("div", { style: { display: "flex", justifyContent: "center", alignItems: "flex-end", height: isEnemy ? 100 : 120, flexShrink: 0, overflow: "visible", background: "transparent", padding: isEnemy ? "0 20px 0" : "2px 20px 0", transform: isEnemy ? "scaleY(-1)" : "none" } },
      hand.map(function(c, i) {
        var rot = (i - mid) * (total > 6 ? 3 : 4.5);
        var ty = Math.abs(i - mid) * (total > 6 ? 4 : 6);
        var ml = total > 7 ? -22 : total > 5 ? -12 : 0;
        var playable = !isEnemy && canPlayCard(c);
        var animCls = hasAnim(c.uid) ? " anim-draw" : "";
        if (isEnemy) {
          return React.createElement("div", { key: i, style: { width: 56, height: 78, borderRadius: 4, background: "linear-gradient(160deg,#1a1510,#201810)", border: "1.5px solid #FFD70040", flexShrink: 0, transform: "rotate(" + rot + "deg) translateY(" + ty + "px) scaleY(-1)", transformOrigin: "bottom center", marginLeft: i === 0 ? 0 : -14, position: "relative", zIndex: i, boxShadow: "0 2px 8px #0006" } },
            React.createElement("div", { style: { position: "absolute", inset: 5, border: "1px solid #FFD70010", borderRadius: 4 } }),
            React.createElement("div", { style: { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%) scaleY(-1)", fontSize: 14, color: "#FFD70015", fontFamily: "Cinzel,serif", fontWeight: 900 } }, "R")
          );
        }
        return React.createElement("div", { key: c.uid, className: "card-hover" + animCls, onClick: canAct && !tm && !fc && playable ? function() { onPlay(c); } : function() { onZoom(c); }, style: { width: HAND_W, height: HAND_H, borderRadius: 6, overflow: "hidden", border: "2px solid " + (DOM[c.domain] || DOM.Colorless).c + (playable ? "55" : "20"), flexShrink: 0, cursor: "pointer", transform: "rotate(" + rot + "deg) translateY(" + ty + "px)", transformOrigin: "bottom center", marginLeft: i === 0 ? 0 : (total > 7 ? -30 : total > 5 ? -16 : 0), transition: "transform 0.15s ease", position: "relative", zIndex: i, boxShadow: "0 4px 16px #000a", opacity: (isSD && !playable) ? 0.4 : 1 } },
          c.img ? React.createElement("img", { src: imgSrc(c.img), style: { width: "100%", height: "100%", objectFit: "fill", display: "block" } }) : React.createElement("div", { style: { width: "100%", height: "100%", background: "linear-gradient(180deg," + (DOM[c.domain] || DOM.Colorless).c + "15,#0a0a18)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#666", padding: 4, textAlign: "center" } }, c.name)
        );
      })
    );
  }

  return (
    <div style={{ height: "100vh", background: "transparent", color: "#ddd", fontFamily: "'Inter',sans-serif", display: "flex", flexDirection: "column", overflow: "hidden" }}>

      {zoom && (function() {
        var isMyBase = canAct && !tm && !fc && cur && cur.base.some(function(u) { return u.uid === zoom.uid && !u.exhausted; });
        var isMyChamp = false;
        return <div onClick={function() { setZoom(null); setSel(null); }} style={{ position: "fixed", inset: 0, background: "#000c", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1100, cursor: "pointer" }}>
          <div onClick={function(e) { e.stopPropagation(); }} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, cursor: "default" }}>
            {zoom.type === "Battlefield" ? (function() { var zPA = zoom.img && imgSrc(zoom.img).indexOf("piltover") > -1; return <div style={{ width: 524, height: 374, borderRadius: 10, overflow: "hidden", border: "3px solid #FFD70044", boxShadow: "0 8px 40px #000a", position: "relative" }}>{zoom.img ? <img src={imgSrc(zoom.img)} style={zPA ? { position: "absolute", top: "50%", left: "50%", width: 374, height: 524, objectFit: "cover", transform: "translate(-50%,-50%) rotate(90deg)" } : { width: "100%", height: "100%", objectFit: "cover", display: "block" }} /> : <div style={{ width: "100%", height: "100%", background: "#141828", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}><div style={{ fontSize: 20, fontWeight: 700, color: "#FFD700", fontFamily: "Cinzel,serif" }}>{zoom.name}</div><div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>{zoom.text}</div></div>}</div>; })() : <Card card={zoom} zoomed />}
            {(isMyBase || isMyChamp) && <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>

            {bfs.map(function(bf, bi) {
                return <button key={bi} onClick={function() { if (isMyChamp) { deployChampion(bi); } else { moveUnit(zoom.uid, bi); } setZoom(null); setSel(null); }} style={{ padding: "8px 16px", borderRadius: 5, border: "2px solid #FFD700", background: "linear-gradient(135deg,#FFD70045,#FF8C0015)", color: "#FFD700", cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: "Cinzel,serif" }}>Deploy to {bf.name}</button>;
              })}
            </div>}
            {isMyBase && <div style={{ fontSize: 10, color: "#666", fontStyle: "italic" }}>or drag from base to deploy</div>}
                        <button onClick={function() { setZoom(null); setSel(null); }} style={{ padding: "6px 16px", borderRadius: 4, border: "1px solid #333", background: "transparent", color: "#666", cursor: "pointer", fontSize: 11 }}>Close</button>
          </div>
        </div>;
      })()}
      {screen === "go" && <div style={{ position: "fixed", inset: 0, background: "#000d", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}><div style={{ textAlign: "center" }}><h1 style={{ fontSize: 42, fontFamily: "Cinzel,serif", background: "linear-gradient(135deg,#FFD700,#FF8C00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>VICTORY</h1><p style={{ color: "#FFD700", fontFamily: "Cinzel,serif", fontSize: 18, marginTop: 8 }}>Player {(win || 0) + 1}</p><button onClick={resetAll} style={{ marginTop: 14, padding: "10px 24px", borderRadius: 5, border: "2px solid #FFD700", background: "linear-gradient(135deg,#FFD70040,#FF8C0030)", color: "#FFD700", cursor: "pointer", fontWeight: 700, fontFamily: "Cinzel,serif" }}>MAIN MENU</button></div></div>}

      {fc && <div onClick={function(e) { if (e.target === e.currentTarget) { setFc(null); setTr([]); } }} style={{ position: "fixed", inset: 0, background: "#000c", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 900 }}>
        <div style={{ background: "#12162a", borderRadius: 10, padding: 16, border: "2px solid #FFD70033", maxWidth: 500, textAlign: "center" }}>
          <Card card={fc} zoomed />
          <div style={{ fontSize: 12, color: "#FFD700", fontWeight: 700, marginTop: 8, marginBottom: 5, fontFamily: "Cinzel,serif" }}>{fc.energy === 0 ? "Free to play" : "Tap " + fc.energy + " Rune" + (fc.energy > 1 ? "s" : "")}</div>
          {fc.energy > 0 && <div style={{ fontSize: 10, color: tr.length >= fc.energy ? "#4ADE80" : "#f87171", marginBottom: 5 }}>{tr.length >= fc.energy ? "Ready!" : "Tap " + (fc.energy - tr.length) + " more"}</div>}
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center", marginBottom: 7 }}>
            {cur.runes.filter(function(r) { return !r.exhausted; }).sort(function(a, b) { return DOM[a.domain].o - DOM[b.domain].o; }).map(function(r) {
              var sel2 = tr.indexOf(r.uid) >= 0;
              var runeUrl = r.img ? imgSrc(r.img) : "";
              return <div key={r.uid} onClick={function(e) { e.stopPropagation(); if (sel2) setTr(tr.filter(function(x) { return x !== r.uid; })); else if (tr.length < fc.energy) setTr(tr.concat([r.uid])); }} style={{ width: 77, height: 108, borderRadius: 5, overflow: "hidden", border: "2px solid " + (sel2 ? "#FFD700" : DOM[r.domain].c + "33"), cursor: "pointer", opacity: sel2 ? 1 : 0.3, background: "#0c0c18", transition: "opacity 0.2s ease" }}>{runeUrl ? <img src={runeUrl} style={{ width: "100%", height: "100%", objectFit: "fill" }} /> : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "radial-gradient(circle," + DOM[r.domain].c + "cc," + DOM[r.domain].c + "44)" }}><span style={{ fontSize: 18 }}>{DOM[r.domain].i}</span></div>}</div>;
            })}
          </div>
          <div style={{ display: "flex", gap: 5, justifyContent: "center" }}>
            <button onClick={function(e) { e.stopPropagation(); confirmPlay(); }} disabled={tr.length < fc.energy && fc.energy > 0} style={{ padding: "6px 16px", borderRadius: 4, border: "2px solid #FFD700", background: (tr.length >= fc.energy || fc.energy === 0) ? "linear-gradient(135deg,#FFD70040,#FF8C0030)" : "#222", color: (tr.length >= fc.energy || fc.energy === 0) ? "#FFD700" : "#555", cursor: (tr.length >= fc.energy || fc.energy === 0) ? "pointer" : "not-allowed", fontWeight: 700, fontFamily: "Cinzel,serif" }}>PLAY</button>
            <button onClick={function(e) { e.stopPropagation(); setFc(null); setTr([]); }} style={{ padding: "6px 12px", borderRadius: 4, border: "1px solid #333", background: "transparent", color: "#666", cursor: "pointer" }}>Cancel</button>
          </div>
        </div>
      </div>}

      {/* Awaken phase overlay */}
      {awakenPhase && <div style={{ position: "fixed", top: 0, left: 0, right: 200, height: 40, background: "linear-gradient(90deg,transparent,#FFD70015,transparent)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 800, pointerEvents: "none" }}>
        <span className="anim-pulse" style={{ fontFamily: "Cinzel,serif", fontSize: 16, fontWeight: 700, color: "#FFD700", letterSpacing: 3, textTransform: "uppercase" }}>{awakenPhase === "untap" ? "Awaken" : awakenPhase === "score" ? "Begin" : awakenPhase === "channel" ? "Channel" : "Draw"}</span>
      </div>}

      <div style={{ flex: 1, display: "flex", overflow: "hidden", background: "linear-gradient(180deg, #0c0c22 0%, #141438 30%, #1a1a48 50%, #141438 70%, #0c0c22 100%)" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

          {/* ENEMY HALF (content + score track on right) */}
          <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
            <div style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0, overflow: "visible" }}>
          {/* ENEMY HAND + PILES - all same level */}
          <div style={{ display: "flex", alignItems: "flex-start", flexShrink: 0, overflow: "visible", padding: "4px 6px 2px", zIndex: 5, position: "relative", gap: 0 }}>
            {ps.filter(function(_, i) { return i !== act; }).map(function(enemy) {
              return <div key={"ehand"} style={{ display: "flex", alignItems: "flex-start", flex: 1 }}>
                <BinPile trash={enemy.trash} />
                <CardBack w={HAND_W} h={HAND_H} count={enemy.mainDeck.length} label="DECK" />
                <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "flex-start", height: isEnemy ? 100 : 120, overflow: "visible" }}>
                  {enemy.hand.map(function(c, i) {
                    var total = enemy.hand.length;
                    var mid = (total - 1) / 2;
                    var rot = -(i - mid) * (total > 6 ? 2.5 : 3.5);
                    var ty = -(Math.abs(i - mid) * (total > 6 ? 3 : 5));
                    return <div key={"eh-" + i} style={{ width: HAND_W, height: isEnemy ? 100 : 120, borderRadius: 6, background: "linear-gradient(160deg,#1a1510,#201810)", border: "1.5px solid #FFD70040", flexShrink: 0, transform: "rotate(" + rot + "deg) translateY(" + ty + "px)", transformOrigin: "top center", marginLeft: i === 0 ? 0 : (total > 7 ? -45 : total > 5 ? -25 : -8), position: "relative", zIndex: i, boxShadow: "0 2px 8px #0006" }}>
                      <div style={{ position: "absolute", inset: 5, border: "1px solid #FFD70010", borderRadius: 4 }} />
                      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontSize: 22, color: "#FFD70030", fontFamily: "Cinzel,serif", fontWeight: 900 }}>R</div>
                    </div>;
                  })}
                </div>
                <CardBack w={HAND_W} h={HAND_H} count={enemy.runeDeck ? enemy.runeDeck.length : 0} label="RUNES" />
              </div>;
            })}
          </div>

            </div>
          </div>

          {/* MERGED BATTLEFIELD ZONE - with legend/runes/base as side columns */}
          <div style={{ display: "flex", gap: 3, padding: "0 4px 2px", flex: 1, minHeight: 40, position: "relative", zIndex: 3 }}>
            {/* Player legend + champion column */}
            <div style={{ display: "flex", flexDirection: "column", gap: 3, flexShrink: 0, justifyContent: "center" }}>
              {cur.legend && <div className="card-hover" onClick={function() { setZoom(cur.legend); }} style={{ width: LEGEND_W, height: LEGEND_H, borderRadius: 6, overflow: "hidden", border: "2px solid #FFD70033", cursor: "pointer" }}>{cur.legend.img ? <img src={imgSrc(cur.legend.img)} style={{ width: "100%", height: "100%", objectFit: "fill" }} onError={function(e) { if (PA[cur.legend.name] && e.target.src.indexOf("piltover") < 0) { e.target.src = PA_CDN + PA[cur.legend.name] + ".webp"; } }} /> : <div style={{ width: "100%", height: "100%", background: "#151530", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#FFD700", padding: 2, textAlign: "center" }}>{cur.legend.name}</div>}</div>}
              {cur.champion && <div className="card-hover" onClick={function() { if (!cur.championPlayed && canAct && !tm && !fc && cur.champion.energy > 0) { openPlay(cur.champion); } else if (!cur.championPlayed && canAct && !tm && !fc && (cur.champion.energy === 0 || cur.champion.energy === null)) { playChampionToBase(); } else { setZoom(cur.champion); } }} style={{ width: LEGEND_W, height: LEGEND_H, borderRadius: 6, overflow: "hidden", border: "2px solid " + (cur.championPlayed ? "#FFD70015" : "#FFD70055"), cursor: "pointer", opacity: cur.championPlayed ? 0.4 : 1 }}>{cur.champion.img ? <img src={imgSrc(cur.champion.img)} style={{ width: "100%", height: "100%", objectFit: "fill" }} onError={function(e) { if (PA[cur.champion.name] && e.target.src.indexOf("piltover") < 0) { e.target.src = PA_CDN + PA[cur.champion.name] + ".webp"; } }} /> : <div style={{ width: "100%", height: "100%", background: "#151530", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#FFD700", padding: 2, textAlign: "center" }}>{cur.champion.name}</div>}</div>}
            </div>
            {/* Enemy base column */}
            {ps.filter(function(_, i) { return i !== act; }).map(function(enemy) {
              var eI = ps.indexOf(enemy);
              return <div key={"ebase"} style={{ width: LEGEND_W, flexShrink: 0, display: "flex", flexDirection: "column", gap: 2, padding: "3px 2px", borderRadius: 6, border: "1px solid #ffffff15", justifyContent: "flex-start", alignItems: "center", overflow: "auto" }}>
                <div style={{ fontSize: 7, color: "#ffffff30", fontFamily: "Cinzel,serif", letterSpacing: 1 }}>BASE</div>
                {enemy.base.map(function(u) { return <Card key={u.uid} card={u} small onClick={tm ? function() { resTarget(u, eI, null); } : function() { setZoom(u); }} />; })}
              </div>;
            })}
            {/* Enemy runes column */}
            {ps.filter(function(_, i) { return i !== act; }).map(function(enemy) {
              return <div key={"erunes"} style={{ width: LEGEND_W, flexShrink: 0, display: "flex", flexDirection: "column", gap: 2, padding: "3px 2px", borderRadius: 6, border: "1px solid #FFD70025", justifyContent: "center", alignItems: "center", overflow: "auto" }}>
                <div style={{ fontSize: 7, color: "#FFD70044", fontFamily: "Cinzel,serif", letterSpacing: 1 }}>RUNES</div>
                {enemy.runes.sort(function(a, b) { return DOM[a.domain].o - DOM[b.domain].o; }).map(function(r) {
                  var rUrl = r.img ? imgSrc(r.img) : "";
                  return <div key={r.uid} style={{ width: RUNE_W, height: RUNE_H, borderRadius: 5, overflow: "hidden", border: "1.5px solid " + (r.exhausted ? "#333" : DOM[r.domain].c + "55"), opacity: r.exhausted ? 0.3 : 1, flexShrink: 0 }}>{rUrl ? <img src={rUrl} style={{ width: "100%", height: "100%", objectFit: "fill" }} /> : <div style={{ width: "100%", height: "100%", background: DOM[r.domain].c + "33", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: RUNE_W * 0.3 }}>{DOM[r.domain].i}</span></div>}</div>;
                })}
              </div>;
            })}
            {bfs.map(function(bf, bi) {
              var bfImg = CI[bf.name] ? imgSrc(CI[bf.name]) : (PA[bf.name] ? PA_CDN + PA[bf.name] + ".webp" : "");
              var controlled = bf.controller !== null;
              var isPA = bfImg.indexOf("piltover") > -1;
              var canMove = canAct && sel && !tm && !fc;
              var isDragOver = dragUnit && !dragUnit.exhausted;
              return <div key={"my-" + bf.uid}
                onClick={canMove ? function() { moveUnit(sel.uid, bi); } : undefined}
                onDragOver={isDragOver ? function(e) { e.preventDefault(); e.dataTransfer.dropEffect = "move"; } : undefined}
                onDrop={isDragOver ? function(e) { e.preventDefault(); var uid2 = e.dataTransfer.getData("text/plain"); if (uid2) { moveUnit(uid2, bi); setDragUnit(null); } } : undefined}
                style={{ flex: 1, background: canMove ? "rgba(255,215,0,0.04)" : isDragOver ? "rgba(255,215,0,0.04)" : "rgba(255,215,0,0.015)", borderRadius: 8, border: "1px solid " + (canMove ? "#FFD70044" : isDragOver ? "#FFD70033" : "#FFD70020"), display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", alignContent: "center", gap: 4, padding: "4px", overflow: "visible", position: "relative", cursor: canMove ? "pointer" : "default", outline: isSD && sd && sd.bfIdx === bi ? "2px solid #FF6B35" : "none" }}>
                {/* Enemy units */}
                {ps.map(function(p, pi) { if (pi === act || !bf.units[pi] || bf.units[pi].length === 0) return null; return bf.units[pi].map(function(u) { return <Card key={u.uid} card={u} small onClick={tm ? function() { resTarget(u, pi, bi); } : function() { setZoom(u); }} />; }); })}
                {/* BF card in center */}
                <div style={{ width: "100%", display: "flex", justifyContent: "center", padding: "2px 0", position: "relative", flexShrink: 0, overflow: "hidden", minHeight: isPA ? BF_W : BF_H }}>
                  {bfImg ? <img src={bfImg} alt={bf.name} onClick={function(e) { e.stopPropagation(); setZoom(bfs[bi]); }} style={isPA ? { position: "absolute", top: "50%", left: "50%", width: BF_H, height: BF_W, objectFit: "cover", borderRadius: 6, cursor: "pointer", transform: "translate(-50%,-50%) rotate(90deg)" } : { width: BF_W, height: BF_H, objectFit: "cover", borderRadius: 6, border: "1px solid #FFD70015", cursor: "pointer" }} /> : <div style={{ width: BF_W, height: BF_H, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#ffffff30" }}>{bf.name}</div>}

                </div>
                {/* Player units */}
                {bf.units[act] && bf.units[act].map(function(u) { return <Card key={u.uid} card={u} small onClick={function() { setZoom(u); }} />; })}
                {(canMove || isDragOver) && <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,215,0,0.03)", borderRadius: 8, pointerEvents: "none" }}><span style={{ background: "#FFD70045", border: "1px dashed #FFD70055", borderRadius: 6, padding: "3px 12px", fontSize: 10, color: "#FFD700", fontWeight: 700, fontFamily: "Cinzel,serif" }}>Deploy here</span></div>}
              </div>;
            })}
            {/* Enemy champion + legend column (mirrored) */}
            {ps.filter(function(_, i) { return i !== act; }).map(function(enemy) {
              var eImg = enemy.legend && enemy.legend.img ? imgSrc(enemy.legend.img) : "";
              var eCImg = enemy.champion && enemy.champion.img ? imgSrc(enemy.champion.img) : "";
              return <div key={"elegend"} style={{ display: "flex", flexDirection: "column", gap: 3, flexShrink: 0, justifyContent: "center" }}>
                <div className="card-hover" onClick={function() { if (enemy.champion) setZoom(enemy.champion); }} style={{ width: LEGEND_W, height: LEGEND_H, borderRadius: 6, overflow: "hidden", border: "2px solid #ffffff25", cursor: "pointer" }}>{eCImg ? <img src={eCImg} style={{ width: "100%", height: "100%", objectFit: "fill" }} onError={function(e) { if (enemy.champion && PA[enemy.champion.name] && e.target.src.indexOf("piltover") < 0) { e.target.src = PA_CDN + PA[enemy.champion.name] + ".webp"; } }} /> : <div style={{ width: "100%", height: "100%", background: "#151530", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: "#555", textAlign: "center" }}>{enemy.champion ? enemy.champion.name : "?"}</div>}</div>
                <div className="card-hover" onClick={function() { if (enemy.legend) setZoom(enemy.legend); }} style={{ width: LEGEND_W, height: LEGEND_H, borderRadius: 6, overflow: "hidden", border: "2px solid #ffffff25", cursor: "pointer" }}>{eImg ? <img src={eImg} style={{ width: "100%", height: "100%", objectFit: "fill" }} onError={function(e) { if (enemy.legend && PA[enemy.legend.name] && e.target.src.indexOf("piltover") < 0) { e.target.src = PA_CDN + PA[enemy.legend.name] + ".webp"; } }} /> : <div style={{ width: "100%", height: "100%", background: "#151530", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: "#555", textAlign: "center" }}>{enemy.legend ? enemy.legend.name : "?"}</div>}</div>
              </div>;
            })}
            {/* Player runes column */}
            <div style={{ width: LEGEND_W, flexShrink: 0, display: "flex", flexDirection: "column", gap: 2, padding: "3px 2px", borderRadius: 6, border: "1px solid #FFD70025", justifyContent: "center", alignItems: "center", overflow: "auto" }}>
              <div style={{ fontSize: 7, color: "#FFD70044", fontFamily: "Cinzel,serif", letterSpacing: 1 }}>RUNES</div>
              {cur.runes.sort(function(a, b) { return DOM[a.domain].o - DOM[b.domain].o; }).map(function(r) {
                var rUrl = r.img ? imgSrc(r.img) : "";
                var animCls = hasAnim(r.uid) ? " anim-draw" : "";
                return <div key={r.uid} className={"card-hover" + animCls} onClick={function() { setZoom(r); }} style={{ width: RUNE_W, height: RUNE_H, borderRadius: 5, overflow: "hidden", border: "2px solid " + (r.exhausted ? "#DC262644" : DOM[r.domain].c + "66"), opacity: r.exhausted ? 0.35 : 1, cursor: "pointer", flexShrink: 0 }}>{rUrl ? <img src={rUrl} style={{ width: "100%", height: "100%", objectFit: "fill" }} /> : <div style={{ width: "100%", height: "100%", background: DOM[r.domain].c + "33", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: RUNE_W * 0.3 }}>{DOM[r.domain].i}</span></div>}</div>;
              })}
            </div>
            {/* Player base column */}
            <div style={{ width: LEGEND_W, flexShrink: 0, display: "flex", flexDirection: "column", gap: 2, padding: "3px 2px", borderRadius: 6, border: "1px solid #ffffff15", justifyContent: "flex-start", alignItems: "center", overflow: "auto" }}>
              <div style={{ fontSize: 7, color: "#ffffff30", fontFamily: "Cinzel,serif", letterSpacing: 1 }}>BASE</div>
              {cur.base.map(function(u) {
                var isDraggable = !u.exhausted && canAct && !fc && !tm;
                return <div key={u.uid} draggable={isDraggable} onDragStart={isDraggable ? function(e) { e.dataTransfer.setData("text/plain", u.uid); setDragUnit(u); } : undefined} onDragEnd={function() { setDragUnit(null); }}><Card card={u} small selected={sel && sel.uid === u.uid} onClick={function() { if (tm) { resTarget(u, act, null); } else { setZoom(u); } }} /></div>;
              })}
            </div>
          </div>

          {/* PLAYER HALF (score track + content) */}
          <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", padding: "4px 3px", flexShrink: 0, width: 42, background: "rgba(0,0,0,0.2)", borderRight: "1px solid #FFD70018" }}>
              {[8,7,6,5,4,3,2,1].map(function(n) { var f = n <= cur.score; return <div key={n} className={f && awakenPhase === "score" ? "anim-pulse" : ""} style={{ width: 31, height: 31, borderRadius: "50%", border: "2px solid " + (f ? "#FFD700" : "#ffffff15"), background: f ? "linear-gradient(135deg,#FFE544,#FFcc33)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: f ? "#000" : "#ffffff20" }}>{n}</div>; })}
            </div>
            <div style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>


          {/* PLAYER HAND + PILES */}
          <div style={{ display: "flex", alignItems: "flex-end", flexShrink: 0, overflow: "visible", padding: "0 6px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center", padding: "4px 2px", flexShrink: 0 }}>
              <CardBack w={50} h={70} count={cur.runeDeck ? cur.runeDeck.length : 0} label="RUNES" />
            </div>
            <div style={{ flex: 1, overflow: "visible" }}>
              <FannedHand hand={cur.hand} isEnemy={false} onPlay={openPlay} onZoom={setZoom} />
            </div>
            <div style={{ display: "flex", gap: 3, alignItems: "flex-end", padding: "4px 2px", flexShrink: 0 }}>
              <CardBack w={50} h={70} count={cur.mainDeck.length} label="DECK" />
              <BinPile trash={cur.trash} />
            </div>
          </div>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div style={{ width: 200, background: "transparent", borderLeft: "1px solid #FFD70015", display: "flex", flexDirection: "column", flexShrink: 0 }}>
          <div style={{ padding: 8, borderBottom: "1px solid #FFD70015", display: "flex", flexDirection: "column", gap: 5 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 900, fontSize: 16, fontFamily: "Cinzel,serif", background: "linear-gradient(135deg,#FFD700,#FF8C00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Turn {turn}</span>
              <span style={{ fontSize: 10, color: "#555", fontFamily: "Cinzel,serif" }}>{isSD ? "SHOWDOWN" : awakenPhase ? awakenPhase.toUpperCase() : screen === "wait" ? "WAIT" : "MAIN"}</span>
            </div>
            {tm && <div style={{ background: "#FFD70010", borderRadius: 4, padding: 5, fontSize: 11, color: "#FFD700", textAlign: "center", border: "1px solid #FFD70040" }}>{tm.ty === "buff" ? "Pick friendly" : tm.ty === "dmg" ? "Pick to damage" : tm.ty === "stun" ? "Pick enemy" : "Target"}<br /><button onClick={function() { setTm(null); }} style={{ marginTop: 3, padding: "1px 6px", border: "1px solid #333", background: "transparent", color: "#555", cursor: "pointer", fontSize: 9, borderRadius: 3 }}>cancel</button></div>}
            {screen === "wait" && !awakenPhase && <button onClick={doStartTurn} style={{ padding: 10, borderRadius: 5, border: "2px solid #FFD700", background: "linear-gradient(135deg,#FFD70040,#FF8C0015)", color: "#FFD700", cursor: "pointer", fontSize: 12, fontWeight: 700, textAlign: "center", lineHeight: 1.3, fontFamily: "Cinzel,serif" }}>AWAKEN / BEGIN / CHANNEL / DRAW</button>}
            {awakenPhase && <div style={{ textAlign: "center", padding: 6, background: "#FFD70008", borderRadius: 4, border: "1px solid #FFD70040" }}><div className="anim-pulse" style={{ fontSize: 13, fontWeight: 700, fontFamily: "Cinzel,serif", color: "#FFD700", textTransform: "uppercase", letterSpacing: 2 }}>{awakenPhase}</div></div>}
            {isSD && <div style={{ textAlign: "center" }}><div style={{ fontSize: 13, color: "#FF6B35", fontWeight: 700, fontFamily: "Cinzel,serif" }}>SHOWDOWN</div><div style={{ fontSize: 9, color: "#666", marginTop: 2 }}>Spells only</div>{hasPri ? <button onClick={passPriority} style={{ padding: 7, borderRadius: 4, border: "2px solid #FF6B35", background: "#FF6B3515", color: "#FF6B35", cursor: "pointer", fontSize: 11, fontWeight: 700, marginTop: 3, width: "100%", fontFamily: "Cinzel,serif" }}>PASS PRIORITY</button> : <div style={{ fontSize: 10, color: "#666", marginTop: 3 }}>Waiting P{sd ? sd.priority + 1 : "?"}...</div>}</div>}
            {screen === "play" && !awakenPhase && <button onClick={endTurn} style={{ padding: 10, borderRadius: 5, border: "2px solid #FFD700", background: "linear-gradient(135deg,#FFD70040,#FF8C0015)", color: "#FFD700", cursor: "pointer", fontSize: 14, fontWeight: 700, width: "100%", fontFamily: "Cinzel,serif" }}>END TURN</button>}
            {sel && canAct && !tm && !fc && <div style={{ padding: 5, fontSize: 11, color: "#aaa", textAlign: "center", background: "#FFD70008", borderRadius: 4, border: "1px solid #FFD70040" }}>Selected: <b style={{ color: "#FFD700" }}>{sel.name}</b><br /><span style={{ fontSize: 10, color: "#888" }}>click a battlefield</span></div>}
          </div>
          <div ref={lr} style={{ flex: 1, overflow: "auto", padding: 6, fontSize: 10, lineHeight: 1.5 }}>
            {log.map(function(e, i) { return <div key={i} style={{ color: e.m.indexOf("===") >= 0 ? "#FFD700" : e.m.indexOf("wins") >= 0 ? "#FFD700" : e.m.indexOf("SHOWDOWN") >= 0 ? "#FF6B35" : e.m.indexOf("onquer") >= 0 ? "#4ADE80" : "#667", marginBottom: 2, fontFamily: e.m.indexOf("===") >= 0 ? "Cinzel,serif" : "inherit" }}>{e.m}</div>; })}
          </div>
        </div>
      </div>
    </div>
  );

}
