const { Sequelize,sequelize,PrivateApt, PrivateAptDetail1, PrivateAptDetail2, PrivateImg ,Like, PubNotice,  PublicImg} = require('../models')


const getPrivateDetail = async (req, res, next) => {
    let detail1 ={};
    let detail2=[];
    let detail2Info={};
    try{
        const {aptNo} = req.params;
        const list_data = await PrivateApt.findOne({
            attributes: ['executor','operation','houseName','winDate','receptStartDate','receptEndDate','rentSection','sido'],
            where : {pblancNo : aptNo}
        });
        const detail1_data = await PrivateAptDetail1.findOne({
            attributes :['contractStartDate','contractEndDate','relevantArea1Date','etcArea1Date','gyeonggi1Date','relevantArea2Date','etcArea2Date','gyeonggi2Date','homePage','applyAddress','plusSupplyStartDate','plusSupplyEndDate','supplySize'],
            where : {fk_pblancNo:aptNo}
        })
        const {executor,operation,houseName,winDate,receptStartDate,receptEndDate,rentSection,sido} = list_data;
        const {contractStartDate,contractEndDate,relevantArea1Date,etcArea1Date,gyeonggi1Date,relevantArea2Date,etcArea2Date,gyeonggi2Date,homePage,applyAddress,plusSupplyStartDate,plusSupplyEndDate,supplySize} = detail1_data;
        detail1['executor'] = executor;
        detail1['operation']=operation;
        detail1['houseName'] = houseName;
        detail1['winDate'] = winDate;
        detail1['receptStartDate']=receptStartDate;
        detail1['receptEndDate']=receptEndDate;
        detail1['rentSection']=rentSection;
        detail1['sido']=sido;
        detail1['contractStartDate']=contractStartDate;
        detail1['contractEndDate']=contractEndDate;
        detail1['relevantArea1Date'] = relevantArea1Date;
        detail1['etcArea1Date']= etcArea1Date;
        detail1['gyeonggi1Date'] = gyeonggi1Date;
        detail1['relevantArea2Date']=relevantArea2Date;
        detail1['etcArea2Date']=etcArea2Date;
        detail1['gyeonggi2Date']=gyeonggi2Date;
        detail1['homePage']= homePage;
        detail1['applyAddress']=applyAddress;
        detail1['plusSupplyStartDate']=plusSupplyStartDate;
        detail1['plusSupplyEndDate']=plusSupplyEndDate;
        detail1['supplySize']=supplySize;
        
        const detail2Count = await PrivateAptDetail2.findAll({
            order:[['houseManageNo','DESC' ]],
            where : {fk_pblancNo:aptNo }
        });
        for(let i=0; i<detail2Count.length; i++){
            const detail2_data = await PrivateAptDetail2.findAll({
                attributes : ['modelNo','type','supplyAreaSize','supplyAmount'],
                where : {fk_pblancNo:aptNo}
            });
            
            const {modelNo, type, supplyAreaSize, supplyAmount} = detail2_data[i];
            detail2Info['modelNo']= modelNo;
            detail2Info['type']=type;
            detail2Info['supplyAreaSize']=supplyAreaSize;
            detail2Info['supplyAmount']=supplyAmount;
            detail2.push(detail2Info);
            detail2Info={};
        }
        res.status(200).send({
            detail1,
            detail2
        });
    }catch(error){
        next(error);
        res.status(400);
    }
}
const getPublicDetail = async(req, res, next)=>{
    let detail ={};
    try{
        const {aptNo} = req.params;
        const detail_list1 = await PubNotice.findOne({
            attributes :['panState','sidoName','aisTypeName','startDate','closeDate','houseCnt','size','moveYM','heatMethod','fileLink','address','detailUrl'],
            where :{panId: aptNo}
        });
        const {panState,sidoName,aisTypeName,startDate,closeDate,houseCnt,size,moveYM,heatMethod,fileLink,address,detailUrl}= detail_list1;
        detail['panState']=panState;
        detail['sidoName']=sidoName;
        detail['aisTypeName']=aisTypeName;
        detail['startDate']=startDate;
        detail['closeDate']=closeDate;
        detail['houseCnt']=houseCnt;
        detail['size']=size;
        detail['moveYM']=moveYM;
        detail['heatMethod']=heatMethod;
        detail['fileLink']=fileLink;
        detail['address']=address;
        detail['detailUrl']=detailUrl;
        
        res.status(200).send({
            detail
        });
    }catch(error){
        next(error);
        res.status(400);
    }
}

const getPrivateImgUrl = async(req, res, next)=>{
    let privateImg ={};
    try{
        const {aptNo} = req.params;
        const imgs = await PrivateImg.findOne({
            attributes :['url1', 'url2', 'url3','url4', 'url5'],
            where : {fk_pblancNo: aptNo}
        });
        const {url1, url2, url3, url4, url5}= imgs;
        privateImg['url1']= url1;
        privateImg['url2']= url2;
        privateImg['url3']= url3;
        privateImg['url4']= url4;
        privateImg['url5']= url5;

        res.status(200).send({
            privateImg
        });

    }catch(error){
        next(error);
        res.status(400);
    }
}

const getPublicImgUrl = async(req, res, next)=>{
    let publicImg = {};
    try{
        const {aptNo}= req.params;
        const imgs = await PublicImg.findOne({
            attributes :['url1', 'url2', 'url3'],
            where : {panId : panId}
        });
        const {url1, url2, url3}= imgs;
        publicImg['url1']= url1;
        publicImg['url2']= url2;
        publicImg['url3']= url3;

        res.status(200).send({
            publicImg
        })
    }catch(error){
        next(error);
        res.status(400);
    }
}

module.exports = {
    getPrivateDetail,
    getPublicDetail,
    getPrivateImgUrl,
    getPublicImgUrl
}