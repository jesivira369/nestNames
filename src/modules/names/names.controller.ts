import { Controller, Post, Body, Get, Query, Put, Param, Delete } from '@nestjs/common';
import { NamesService } from './names.service';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('api/v1/names')
@ApiTags('Names')
export class NamesController {
    constructor(private readonly namesService: NamesService) {
        
    }

    @Post()
    @ApiBody({
        description: 'The name to create',
        examples: {
            example: {
                value: {
                    name: 'Jesus'
                }
            }
        },
        type: String,
    })
    @ApiOperation({
        description: 'Create a new name, returns true if the name was created, false if it already exists',
    })
    createName(@Body() data: {name: string}) {
       return this.namesService.createName(data.name)
    }

    @Get()
    @ApiQuery({
        name: 'start',
        type: 'string',
        required: false,
        description: 'Filter names by start letter',
    })
    @ApiOperation({
        description: 'Get all names, or filter by start letter',
    })
    getNames(@Query('start') start: string){
        return this.namesService.getNames(start)
    }

    @Put(':name')
    @ApiParam({
        name: 'name',
        type: 'string',
        description: 'The name to update',
    })
    @ApiParam({
        name: 'newName',
        type: 'string',
        description: 'The new name',
    })
    @ApiOperation({
        description: 'Update a name, returns true if the name was updated, false if it does not exist or the new name already exists',
    })
    updateName(@Param('name') name: string, @Body('newName') newName: string){
        return this.namesService.updateName(name, newName)
    }

    @Delete(':name')
    @ApiParam({
        name: 'name',
        type: 'string',
        description: 'The name to delete',
    })
    @ApiOperation({
        description: 'Delete a name, returns true if the name was deleted, false if it does not exist',
    })
    deleteName(@Param('name') name: string){
        return this.namesService.deleteName(name)
    }
}
