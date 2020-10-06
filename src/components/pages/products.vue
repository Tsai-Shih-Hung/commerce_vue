<template>
    <div>
         <loading :active.sync="isLoading" ></loading>
        <div class="text-right mt-4">
            <button class="btn btn-primary btn-sm" @click.prevent="edit" 
            type="button" data-toggle="modal" data-target="#productModal"
            @click="edit(true)"
            >建立新商品</button>
        </div>
        <table class="table mt-4">
            <thead>
                <tr>
                    <th width="150">category</th>
                    <th>num</th>
                    <th width="150">origin price</th>
                    <th width="150">price</th>
                    <th width="150"> situstion</th>
                    <th width="150"> edit</th>
                </tr>
            </thead>
        <tbody>
            <tr v-for="(item) in products" :key="item.id">
                <td>{{item.category}}</td>
                <td>{{item.num}}</td>
                <td class="text-right">
                    {{item.origin_price}}
                </td>
                <td class="text-right">
                    {{item.price}}
                </td>
                <td>
                    <span v-if="item.is_enabled" class="text-success">啟用</span>
                    <span v-else>未啟用</span>
                </td>
                <td>
                    <button class="btn btn-outline-primary btn-sm" @click="edit(false,item)">編輯</button>
                </td>
            </tr>
        </tbody>
        </table>

        <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li class="page-item" :class="{'disabled':!pagination.has_pre}">
            <a class="page-link" href="#" aria-label="Previous"
            @click.prevent='getprodcuts(pagination.current_page-1)'>
                <span aria-hidden="true">&laquo;</span>
            </a>
            </li>
            <li class="page-item" v-for="page in pagination.total_pages" :key="page"
            :class="{'active': pagination.current_page === page}">
            <a class="page-link" href="#" @click.prevent="getprodcuts(page)">{{page}}</a>
            </li>
          
            <li class="page-item" :class="{'disabled':!pagination.has_next}">
            <a class="page-link" href="#" aria-label="Next"
             @click.prevent='getprodcuts(pagination.current_page+1)'>
                <span aria-hidden="true">&raquo;</span>
            </a>
            </li>
        </ul>
        </nav>

        <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
                <h5 class="modal-title" id="exampleModalLabel">
                <span>新增產品</span>
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                <div class="col-sm-4">
                    <div class="form-group">
                    <label for="image">輸入圖片網址</label>
                    <input type="text" class="form-control" id="image"
                        placeholder="請輸入圖片連結" v-model="tempProduct.imageUrl">
                    </div>
                    <div class="form-group">
                    <label for="customFile">或 上傳圖片
                        <i class="fas fa-spinner fa-spin"></i>
                    </label>
                    <input type="file" id="customFile" class="form-control"
                        ref="files" @change="changepicture">
                    </div>
                    <img img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                    class="img-fluid" :src="tempProduct.imageUrl" alt="">
                </div>
                <div class="col-sm-8">
                    <div class="form-group">
                    <label for="title">標題</label>
                    <input type="text" class="form-control" id="title" v-model="tempProduct.title"
                        placeholder="請輸入標題">
                    </div>

                    <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="category">分類</label>
                        <input type="text" class="form-control" id="category" v-model="tempProduct.category"
                        placeholder="請輸入分類">
                    </div>
                    <div class="form-group col-md-6">
                        <label for="price">單位</label>
                        <input type="unit" class="form-control" id="unit" v-model="tempProduct.price"
                        placeholder="請輸入單位">
                    </div>
                    </div>

                    <div class="form-row">
                    <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                        <input type="number" class="form-control" id="origin_price" v-model="tempProduct.origin_price"
                        placeholder="請輸入原價">
                    </div>
                    <div class="form-group col-md-6">
                        <label for="price">售價</label>
                        <input type="number" class="form-control" id="price" v-model="tempProduct.price"
                        placeholder="請輸入售價">
                    </div>
                    </div>
                    <hr>

                    <div class="form-group">
                    <label for="description">產品描述</label>
                    <textarea type="text" class="form-control" id="description" v-model="tempProduct.description"
                        placeholder="請輸入產品描述"></textarea>
                    </div>
                    <div class="form-group">
                    <label for="content">說明內容</label>
                    <textarea type="text" class="form-control" id="content" v-model="tempProduct.content"
                        placeholder="請輸入產品說明內容"></textarea>
                    </div>
                    <div class="form-group">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" v-model="tempProduct.is_enabled"
                        :true-value="1"
                        :false-value="0"
                        id="is_enabled">
                        <label class="form-check-label" for="is_enabled">
                        是否啟用
                        </label>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary" @click="updateproduct">確認</button>
            </div>
            </div>
        </div>
        </div>
       
        </div>
       
           
</template>

<script>
import $ from 'jquery'

export default {
    data(){
        return{
            products:[],
            tempProduct:{},
            pagination:{},
            isNew:false,
            isLoading:false,
        };
    },
    methods:{
        getprodcuts(page=1){
        const api='https://vue-course-api.hexschool.io/api/brian92292/admin/products?page=${page}';
        const vm = this;
        vm.isLoading=true;
        this.$http.get(api).then((response) => {
        console.log(response.data);
        vm.products=response.data.products;
        console.log( vm.products);
        vm.isLoading=false;
        vm.pagination=response.data.pagination;
        console.log('輸入pagination',vm.pagination);
        })
    },
        edit(isNew,item){
        $('#productModal').modal('show');
        if(isNew){
            this.tempProduct={};
            this.isNew=true;
            
        }else{
            this.tempProduct=Object.assign({},item);
            this.isNew=false;
            
        }
        },
        updateproduct(){
        let api=`https://vue-course-api.hexschool.io/api/brian92292/admin/product`;
        const vm = this;
        let httpmethod='post';
        if(!vm.isNew){
        let api=`https://vue-course-api.hexschool.io/api/brian92292/admin/product/${vm.tempProduct.id}`;
        let httpmethod='put';
        }
        
        console.log(vm.tempProduct)
        this.$http[httpmethod](api,{data:vm.tempProduct}).then((response) => {
        console.log(response.data);
        console.log(response);
        
        //vm.products=response.data.products;
        //console.log( vm.products);
        if(response.data.success==true){
                console.log('good');
                $('#productModal').modal('hide');
                vm.getprodcuts();
            }
            else{
                $('#productModal').modal('hide');
                console.log('新增失敗');
                vm.getprodcuts();
            }
        
        })
        },
        changepicture(){
            console.log('圖片更改',this);
            const uploadfile=this.$refs.files.files[0];
            const vm=this;
            const formData=new FormData();
            formData.append('file_to_upload',uploadfile);
            const url=`https://vue-course-api.hexschool.io/api/brian92292/admin/upload`;
            this.$http.post(url,formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            }).then((response) => {
            console.log(response.data);
                if(response.data.success){
                    //vm.tempProduct.imageUrl=response.data.imageUrl;
                    vm.$set( vm.tempProduct,'imageUrl',response.data.imageUrl)
                }else{
                    this.$bus.$emit('message:push',response.data.message,'danger');
                }
            })
        },
    },
        created(){
        this.getprodcuts();
    }
};
</script>