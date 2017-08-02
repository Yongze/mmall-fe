/*
* @Author: yw850
* @Date:   2017-07-23 20:45:24
* @Last Modified by:   yw850
* @Last Modified time: 2017-08-03 01:00:30
*/

'use strict';

var _cities = {
    cityInfo : {
        'ACT':['Canberra'],
        'NSW':['Albury-Wodonga','Armidale','Ballina','Balranald','Batemans Bay','Bathurst','Bega','Bourke','Bowral','Broken Hill','Byron Bay','Camden','Campbelltown','Cobar','Coffs Harbour','Cooma','Coonabarabran','Coonamble','Cootamundra','Corowa','Cowra','Deniliquin','Dubbo','Forbes','Forster','Glen Innes','Gosford','Goulburn','Grafton','Griffith','Gundagai','Gunnedah','Hay','Inverell','Junee','Katoomba','Kempsey','Kiama','Kurri Kurri','Lake Cargelligo','Lismore','Lithgow','Maitland','Moree','Moruya','Murwillumbah','Muswellbrook','Nambucca Heads','Narrabri','Narrandera','Newcastle','Nowra-Bomaderry','Orange','Parkes','Parramatta','Penrith','Port Macquarie','Queanbeyan','Raymond Terrace','Richmond','Scone','Singleton','Sydney','Tamworth','Taree','Temora','Tenterfield','Tumut','Ulladulla','Wagga Wagga','Wauchope','Wellington','West Wyalong','Windsor','Wollongong','Wyong','Yass','Young'],
        'NT':['Alice Springs','Anthony Lagoon','Darwin','Katherine','Tennant Creek'],
        'QLD':['Ayr','Beaudesert','Blackwater','Bowen','Brisbane','Buderim','Bundaberg','Caboolture','Cairns','Charleville','Charters Towers','Cooktown','Dalby','Deception Bay','Emerald','Gatton','Gladstone','Gold Coast','Goondiwindi','Gympie','Hervey Bay','Ingham','Innisfail','Kingaroy','Mackay','Mareeba','Maroochydore','Maryborough','Moonie','Moranbah','Mount Isa','Mount Morgan','Moura','Redcliffe','Rockhampton','Roma','Stanthorpe','Toowoomba','Townsville','Warwick','Weipa','Winton','Yeppoon'],
        'SA':['Adelaide','Ceduna','Clare','Coober Pedy','Gawler','Goolwa','Iron Knob','Leigh Creek','Loxton','Millicent','Mount Gambier','Murray Bridge','Naracoorte','Oodnadatta','Port Adelaide Enfield','Port Augusta','Port Lincoln','Port Pirie','Renmark','Victor Harbor','Whyalla'],
        'TAS':['Beaconsfield','Bell Bay','Burnie','Devonport','Hobart','Kingston','Launceston','New Norfolk','Queenstown','Richmond','Rosebery','Smithton','Stanley','Ulverstone','Wynyard'],
        'VIC':['Albury-Wodonga','Ararat','Bacchus Marsh','Bairnsdale','Ballarat','Beechworth','Benalla','Bendigo','Castlemaine','Colac','Echuca','Geelong','Hamilton','Healesville','Horsham','Kerang','Kyabram','Kyneton','Lakes Entrance','Maryborough','Melbourne','Mildura','Moe','Morwell','Port Fairy','Portland','Sale','Sea Lake','Seymour','Shepparton','Sunbury','Swan Hill','Traralgon','Yarrawonga','Wangaratta','Warragul','Werribee','Wonthaggi'],
        'WA':['Broome','Bunbury','Busselton','Coolgardie','Dampier','Derby','Fremantle','Geraldton','Kalgoorlie','Kambalda','Katanning','Kwinana','Mandurah','Meekatharra','Mount Barker','Narrogin','Newman','Northam','Perth','Port Hedland','Tom Price','Wyndham']
    },
    // 获取所有的省份
    getProvinces : function(){
        var provinces = [];
        for(var item in this.cityInfo){
            provinces.push(item);
        }
        return provinces;
    },
    // 获取某省份的所有城市
    getCities : function(provinceName){
        return this.cityInfo[provinceName] || [];
    }
}

module.exports = _cities